import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

export default function UserList({ user, handleLogIn }) {
  return (
    <>
      <section className="users">
        {user?.map((item, idx) => {
          return (
            <Link to={"/home"} key={idx} onClick={() => handleLogIn(item.username, item._id)}>
              <FaUser /> {item.username}
            </Link>
          );
        })}
      </section>
    </>
  );
}
