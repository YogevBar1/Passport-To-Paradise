import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";

function Header(): JSX.Element {
    return (
        <div className="Header">
			<h1>Passport To Paradise</h1>
            <AuthMenu />
        </div>
    );
}

export default Header;
