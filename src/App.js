import { useState } from 'react';
import { Navbar, Container, Nav, Row, Col, Spinner } from 'react-bootstrap';
import './App.css';
import data from './data';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail';
import axios from 'axios';

function App() {
  let [dataNum, countUp] = useState(1);
  let [shoes, moreShoes] = useState(data);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate(); // 페이지 이동을 도와주는 함수

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
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
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
        </Route>
        <Route path="/event" element={<div>오늘의 이벤트<Outlet></Outlet></div>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="*" element={<div>없는 페이지요</div>} />
      </Routes>
    </div>
  );
}

function Product(props) {
  return (
    <Col md={4}>
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