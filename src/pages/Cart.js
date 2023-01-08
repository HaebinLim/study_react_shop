import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Table, Button } from 'react-bootstrap';
import { changeName, changeAge } from '../store/userSlice';
import { countUp } from '../store';

function Cart() {
  let state = useSelector(state => state);
  let cart = useSelector(state => state.cart);
  let dispatch = useDispatch();

  return (
    <Container>
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