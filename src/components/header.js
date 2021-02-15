import { useEffect, useState } from "react"

function Header(props) {
    let [search, setSearch] = useState([]);

    function handleOnSubmit(e) {
        e.preventDefault();
        props.handleOnSubmit(search)
    }

    function handleOnChange(e) {
        setSearch(e.target.value) 
    }

    return <>
        <header className="d-flex flex-row justify-content-end align-items-center px-5 py-2 mx-auto">
            <form onSubmit={handleOnSubmit}>
                <input class="form-control" onChange={handleOnChange} type='search' placeholder='Search'/>
            </form>
        </header>
    </>
}

export default Header