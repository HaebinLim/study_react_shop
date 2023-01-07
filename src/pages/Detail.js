import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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
  let { id } = useParams();
  let product = props.shoes.find((item) => {
    return item.id === Number(id);
  });
  let [alert, setAlert] = useState(true);
  let [count, setCount] = useState(0);
  let [num, numChk] = useState(0);
  let [error, setError] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => { setAlert(false); }, 2000);
    isNaN(num) ? setError(true) : setError(false);

    return () => {
      clearTimeout(timer);
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
    <Container>
      <Row>
        {alert && <Alert variant="success">2초이내 구매시 할인!</Alert>}
        {error ? <Alert variant="danger">그러지말라고</Alert> : ''}
        <Col><img src={'https://codingapple1.github.io/shop/shoes' + (product.id + 1) + '.jpg'} width="100%" alt="" /></Col>
        <Col>
          <input type="text" onChange={(e) => { numChk(e.target.value) }} />
          <h1>{product.title}</h1>
          <p>{product.content}</p>
          <p>{product.price}</p>
          <Box><YellowBtn color="yellow" onClick={() => { setCount(count + 1) }}>👍</YellowBtn> {count}</Box>
          <Button variant="danger">주문하기</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Detail;