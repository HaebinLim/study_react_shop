import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateCart } from '../store';

import { Context1 } from '../App';

let Box = styled.div`
  padding: 8px;
`;
let YellowBtn = styled.button`
  border: 0;
  padding: 8px 12px;
  border-radius: 8px;
  background: ${props => props.color};
  color: ${props => props.color === 'blue' ? 'white' : 'black'};
`;

function Detail(props) {
  let dispatch = useDispatch();
  let { id } = useParams();
  let product = props.shoes.find((item) => {
    return item.id === Number(id);
  });
  let { contxt } = useContext(Context1); // state변경시 쓸데없는 것까지 재렌더링
  let [alert, setAlert] = useState(true);
  let [count, setCount] = useState(0);
  let [num, numChk] = useState(0);
  let [error, setError] = useState(false);
  let [tab, changeTab] = useState(0);
  let [fade, setFade] = useState('');

  useEffect(() => {
    let timer = setTimeout(() => { setAlert(false); }, 2000);
    setFade('end');
    isNaN(num) ? setError(true) : setError(false);
    return () => {
      clearTimeout(timer);
      setFade('');
    }
  }, [num])

  /*
    useEffect(()=>{}) 1. 재렌더링마다 코드실행
    useEffect(()=>{},[]) 2. mount시 1회 코드실행
    useEffect(()=>{
      3. unmount시 1회 코드 실행
    }, [])
    useEffect(()=>{ 
      return ()=>{ 
        4. useEffect 동작전에 실행 
      }
    },[])
    useEffect(()=>{},[state])  5. 특정 state 변경시에만 실행
  */

  return (
    <Container className={'start ' + fade}>
      <Row>
        {contxt}
        {alert && <Alert variant="success">2초이내 구매시 할인!</Alert>}
        {error ? <Alert variant="danger">그러지말라고</Alert> : ''}
        <Col><img src={'https://codingapple1.github.io/shop/shoes' + (product.id + 1) + '.jpg'} width="100%" alt="" /></Col>
        <Col>
          <input type="text" onChange={(e) => { numChk(e.target.value) }} />
          <h1>{product.title}</h1>
          <p>{product.content}</p>
          <p>{product.price}</p>
          <Box><YellowBtn color="yellow" onClick={() => { setCount(count + 1) }}>👍</YellowBtn> {count}</Box>
          <Button variant="danger" onClick={() => {
            product.count = 1;
            dispatch(updateCart(product))
          }}>주문하기</Button>
        </Col>
      </Row>
      <Row>
        <Nav variant="tabs" defaultActiveKey="menu1" as="ul">
          <Nav.Item as="li">
            <Nav.Link eventKey="menu1" onClick={() => { changeTab(0) }}>menu1</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="menu2" onClick={() => { changeTab(1) }}>menu2</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="menu3" onClick={() => { changeTab(2) }}>menu3</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab} />
      </Row>
    </Container>
  )
}

function TabContent({ tab }) {
  let [fade, setFade] = useState('');
  let { contxt } = useContext(Context1);
  useEffect(() => {
    // tab이 변경될 때 마다 실행
    let t = setTimeout(() => { setFade('end') }, 100)
    return () => {
      clearTimeout(t);
      setFade('');
    }
  }, [tab])
  /*
  if (tab === 0) {
    return <div>내용1</div>
  }
  if (tab === 1) {
    return <div>내용2</div>
  }
  if (tab === 2) {
    return <div>내용3</div>
  }*/
  return (
    <div className={`start ${fade}`}>
      {contxt}
      {[<div>내용1</div>, <div>내용2</div>, <div>내용3</div>][tab]}
    </div>
  )
}

export default Detail;