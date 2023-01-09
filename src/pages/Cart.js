import { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Table, Button } from 'react-bootstrap';
import { changeAge } from '../store/userSlice';
import { countUp } from '../store';

/*
function Child() {
  console.log('재렌더링');
  return <div>재렌더링시 자식들도 전부 재렌더링됨</div>
}*/

/* 
  memo
  props가 변할 때만 재렌더링 하기 때문에 
  기존 props와 신규 props를 계속 비교하고 재렌더링 여부 확인 
  (props가 길고 복잡하면 오래걸릴 수 있어용 무거운 컴포넌트에만 사용!)
*/
let Child = memo(() => {
  console.log('재렌더링');
  return <div>꼭 필요할 때만(child의 props가 변할 때만) 재렌더링됨</div>
})

function Cart() {
  let state = useSelector(state => state);
  let cart = useSelector(state => state.cart);
  let dispatch = useDispatch();

  // let result = useMemo(() => { return 함수() }); Cart 컴포넌트 렌더링시 1회만 실행
  // let result = useMemo(() => { return 함수() }, [state]); state 변하면 실행

  return (
    <Container>
      <Child />
      <Row>
        <h1>{state.user.name}({state.user.age})의 장바구니 </h1>
        <Button onClick={() => { dispatch(changeAge(10)) }}>+</Button>
      </Row>
      <Row>
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>상품명</th>
              <th>수량</th>
              <th>변경하기</th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map((item, idx) =>
                <tr key={idx}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.count}</td>
                  <td><Button onClick={() => { dispatch(countUp(item.id)) }}>+</Button></td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}

export default Cart;