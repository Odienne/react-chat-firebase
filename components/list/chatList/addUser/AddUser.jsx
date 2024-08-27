import "./addUser.css"

const AddUser = () => {
    return (
        <div className="addUser">
            <form>
                <input type="text" placeholder="Username"/>
                <button>Search</button>
            </form>
            
            <div className="user">
                <div className="user__detail">
                    <img src="./avatar.png" alt="avatar"/>
                    <span>Kim Jim</span>
                </div>
                <button>Add user</button>
            </div>
        </div>
    )
}

export default AddUser
