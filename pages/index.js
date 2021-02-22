import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";

const USERS_URL = "https://rickandmortyapi.com/api/character/?page=";
const INIT_PAGE = 1;

export default function Home() {
  const [users, setUsers] = React.useState(() => []);
  const [page, setPage] = React.useState(INIT_PAGE);
  const [lastPage, setLastPage] = React.useState();

  React.useEffect(() => {
    getData();
  }, [page]);

  async function getData() {
    const response = await fetch(`${USERS_URL}${page}`);
    const usersData = await response.json();
    setUsers(usersData?.results);
    setLastPage(usersData?.info.pages);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Test Underdog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={`${user.id}.${index}`}>
                  <td>{user?.id}</td>
                  <td>{user?.name}</td>
                  <td>{user?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <section className="pagination">
            <button
              className="first-page-btn"
              onClick={() => setPage(INIT_PAGE)}
              disabled={page === INIT_PAGE || !users.length}
            >
              first
            </button>
            <button
              className="previous-page-btn"
              onClick={() => setPage(page - 1)}
              disabled={page === INIT_PAGE || !users.length}
            >
              previous
            </button>
            <button
              className="next-page-btn"
              onClick={() => setPage(page + 1)}
              disabled={page === lastPage || !users.length}
            >
              next
            </button>
            <button
              className="last-page-btn"
              onClick={() => setPage(lastPage)}
              disabled={page === lastPage || !users.length}
            >
              last
            </button>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
