import List from "../components/list/List.jsx";
import Detail from "../components/detail/Detail.jsx";
import Chat from "../components/chat/Chat.jsx";

const App = () => {
    return (
        <div className='container'>
            <List/>
            <Chat/>
            <Detail/>
        </div>
    )
}

export default App
