import { Link } from "react-router-dom";

export function AppNavbar() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">HackRPI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
                <Link to="/"><a>My Profile</a></Link>
            </li>
            <li>
              <details>
                <summary>Navigation</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link to="/"><a>Home</a></Link>
                  </li>
                  <li>
                    <a>Map</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
