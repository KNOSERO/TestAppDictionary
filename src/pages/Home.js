import { useEffect, useRef, useState } from "react";
import {checkDictionary, countService, login} from "../api/dictionary";
import './Home.css'

const Home = (props) => {

    const lang = useRef();

    const [text, setTest] = useState("");
    const [words, setWords] = useState([]);
    const [token, setToken] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        login({
            name: "test", 
            password: "asdf1234"
        }).then(dane => {
            if(dane) {
                setToken(dane.token);
                countService({
                    token: dane.token
                }).then(count => {
                    if(count) setCount(count.count);
                })
            }
        })
    })

    const [blockClick, setBlockClick] = useState(false);

    const onClick = () => {
        
        if(blockClick) return;
        setBlockClick(true);

        if (token !== null)
        {
            checkDictionary({
                text: text, 
                lang: lang.current.value, 
                token: token
            }).then(words => {
                if(words.length !== 0 )
                    setWords(words[0].filter(word => word.correct === false));
                
                    countService({
                    token: token
                }).then(count => {
                    if(count) setCount(count.count);
                })
            });
        } 
        setTimeout(() => {
            setBlockClick(false);
        }, 1000);
    }

    const changeText = async (event) => {
        setTest(event.target.value);
    }

    return (
        <div id="main">
            <div id="labelbutton">
                <label>{count}</label>
                <select ref={lang} defaultValue="pl-pl">
                    <option value="pl-pl"> Polski </option>
                </select>
                <button onClick={onClick}> Sprawdz </button>                
            </div>
            <textarea type="text" value={text} onChange={changeText}/>
            <div>
                {
                    words.length !== 0
                    ? words.map((word,i) => <label id="badword" key={i}> {word.word} </label>)
                    : null
                }
            </div>
        </div>
    );
}

export default Home;