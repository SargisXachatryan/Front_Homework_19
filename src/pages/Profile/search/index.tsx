import { useEffect, useState } from "react"
import { IUser } from "../../../helpers/types"
import { searchUsers } from "../../../helpers/api"
import { BASE, DEF } from "../../../helpers/default"
import { Link } from "react-router-dom"

export const Search = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [text, setText] = useState<string>('')

    useEffect(() => {
        if (!text.trim())
            return setUsers([])
        searchUsers(text)
            .then(res => {
                setUsers(res.payload as IUser[])
            })
    }, [text])

    return <div className='content'>
        <input
            type="text"
            className="form-control"
            placeholder="Search for friends..."
            value={text}
            onChange={e => setText(e.target.value)}
        />
        <small>Found {users.length} user{users.length > 1 ? "s" : ''}</small>
        <div className="row">
            {users.map(user => <div className="col-md-3" key={user.id}>
                <img
                    className="profile-pic"
                    src={user.picture ? BASE + user.picture : DEF}
                />
                <p>{user.name} {user.surname}</p>
                <Link to={'/profile/' + user.id}>
                    <button className="btn btn-primary btn-sm">Account</button>
                </Link>
            </div>)}
        </div>
    </div>
}
