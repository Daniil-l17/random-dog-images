import { useEffect, useId, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

interface prod {
  message: string;
  status: string;
}

function App() {
  const [result, setResult] = useState<prod>({} as prod);
  const [loading, setLoading] = useState<boolean>(false);
  const id = useId();
  const [inp, setInp] = useState('100');
  const ref = useRef<HTMLInputElement>(null);
  const fun = async () => {
    setLoading(true);
    try {
      const data = (await axios.get<prod>('https://dog.ceo/api/breeds/image/random')).data;
      setResult(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fun();
  }, []);

  

  return (
    <>
      <div className="main">
        <h1>Поднимите себе настроение случайными изображениями собак.</h1>
        <div>
          {loading ? (
            <p>loading...</p>
          ) : (
            <img style={{ filter: `saturate(${inp}%)` }} src={result.message} alt="" />
          )}
        </div>
        <div className="flex justify-center items-center">
          <button
            className=" px-4 py-2 bg-gray-500 font-bold border-none rounded-md my-4 cursor-pointer ski"
            onClick={fun}>
            Сгенирировать новую
          </button>
        </div>
        <div className=" w-full">
          <input
            className="w-full"
            step={5}
            ref={ref}
            type="range"
            id={id}
            value={inp}
            onChange={e => setInp(e.target.value)}
            name="volume"
            min="5"
            max="300"
          />
          <div className="flex justify-between">
            <p>{ref.current?.min}%</p>
            <p>{ref.current?.value}%</p>
            <p>{ref.current?.max}%</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
