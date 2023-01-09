import { lazy, Suspense, createContext, useState, useEffect } from 'react';
import { Navbar, Container, Nav, Row, Col, Spinner } from 'react-bootstrap';
import './App.css';
import data from './data';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

// js 파일 쪼개기 (당장 필요없는 파일은 lazy로 처리. 단점 지연시간 발생할 수 있음 Suspense 사용)
// import Detail from './pages/Detail';
// import Cart from './pages/Cart';
const Detail = lazy(() => import('./pages/Detail'));
const Cart = lazy(() => import('./pages/Cart'));
const Input = lazy(() => import('./pages/Input'));

export let Context1 = createContext(); // state 보관함

function App() {
  let [dataNum, countUp] = useState(1);
  let [shoes, moreShoes] = useState(data);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate(); // 페이지 이동을 도와주는 함수

  let [contxt] = useState('CONTEXT TEST');

  let obj = { name: 'kim' }
  localStorage.setItem('data1', obj); // [object Object] object 자료가 깨짐
  localStorage.setItem('data2', JSON.stringify(obj)); //  json으로 변경해서 저장

  let getObj = localStorage.getItem('data2');
  console.log(JSON.parse(getObj).name); // json -> object 변환

  useEffect(() => {
    const savedId = localStorage.getItem('watched')
    if (savedId === null) { // 이미 watched 항목이 있으면 setItem 하지 말아주세용
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, [])

  /* 
    useQuery (실시간 데이터 다룰 때 사용)
    성공/실패/로딩중 쉽게 파악 가능
    */
  let result = useQuery('userName', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((res) => {
      console.log('요청됨');
      return res.data;
    })
  });

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => { navigate('/') }}>ShoesShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail/0') }}>detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>cart</Nav.Link>
            <Nav.Link onClick={() => { navigate('/test') }}>성능저하</Nav.Link>
          </Nav>
          <div className="ms-auto text-white">
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && `반가워요 ${result.data.name}`}
          </div>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중!!!!!</div>}>
        <Routes>
          <Route path="/" element={
            <>
              <div className="main-bg"></div>
              <Row>
                {loading ?
                  <Col><Spinner animation="border" /></Col>
                  :
                  <>
                    {
                      shoes.map((item, idx) => {
                        return (
                          <Product key={idx} item={item} idx={idx}></Product>
                        )
                      })
                    }
                  </>
                }
              </Row>
              {dataNum >= 3 ? null :
                <button onClick={() => {
                  countUp(++dataNum);
                  setLoading(true);
                  axios.get('https://codingapple1.github.io/shop/data' + dataNum + '.json')
                    .then((res) => {
                      // let copy = [...shoes, ...res.data];
                      let newList = [].concat(shoes, res.data);
                      moreShoes(newList);
                      setLoading(false);
                    }).catch(() => {
                      console.log('error');
                    })
                  /*
                  fetch('')
                    .then(결과 => 결과.json()) JSON 변환 과정 필요
                    .then(data => {})
                  */
                }}>더보기</button>
              }
            </>
          } />
          <Route path="/detail/:id" element={
            <Context1.Provider value={{ contxt }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/test" element={<Input />} />
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버임</div>} />
          </Route>
          <Route path="/event" element={<div>오늘의 이벤트<Outlet></Outlet></div>}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
          </Route>
          <Route path="*" element={<div>없는 페이지요</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

function Product(props) {
  let navigate = useNavigate();
  return (
    <Col md={4} onClick={() => { navigate('/detail/' + props.item.id) }}>
      <img src={process.env.PUBLIC_URL + '/images/shoes' + (props.idx + 1) + '.jpg'} width="80%" alt="" />
      <div>
        <strong>{props.item.title}</strong>
        <p>{props.item.price}</p>
      </div>
    </Col>
  )
}

function About() {
  return <div>
    회사정보
    <Outlet></Outlet>
  </div>
}

export default App;