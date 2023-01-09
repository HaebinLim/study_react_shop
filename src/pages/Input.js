import { useState, useTransition, useDeferredValue } from 'react';

let a = new Array(10000).fill(0); // 0으로 채움

function Input() {
  let [name, setName] = useState('');
  let [isPending, startTransition] = useTransition();
  let state = useDeferredValue(name);


  return (
    <div className="wrap">
      <input onChange={(e) => {
        startTransition(() => {
          setName(e.target.value) // 성능 저하의 원인 startTransition로 감싸주기
        })
      }} />
      {
        isPending ? '로딩중' :
          a.map((a, i) => {
            return <div key={i}>{state}</div>
          })
      }
    </div>
  )
}

export default Input;