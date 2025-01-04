import React,{useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../assets/css/dashboard.css'
import library from '../assets/img/library.jpg'
export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalAuthors: 0,
    totalPublishers: 0,
    activeBorrows: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch Books
        const booksResponse = await fetch('http://localhost:8080/api/book/getAllBooks');
        const booksData = await booksResponse.json();
        const totalBooks = booksData.length;

        // Fetch Authors
        const authorsResponse = await fetch('http://localhost:8080/api/author/getAllAuthor');
        const authorsData = await authorsResponse.json();
        const totalAuthors = authorsData.length;

        // Fetch Publishers
        const publishersResponse = await fetch('http://localhost:8080/api/publisher/getAllPublisher');
        const publishersData = await publishersResponse.json();
        const totalPublishers = publishersData.length;

        // Fetch Borrows
        const borrowsResponse = await fetch('http://localhost:8080/api/borrow/getAllBorrows');
        const borrowsData = await borrowsResponse.json();
        const activeBorrows = borrowsData.filter(borrow => borrow.status === 'borrowed').length;

        // Set stats
        setStats({
          totalBooks,
          totalAuthors,
          totalPublishers,
          activeBorrows,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container" >
        <Sidebar />
        <div className="dashboard-content" >
          <h1>
          Welcome to the Library Management Dashboard</h1>
          <table className="stats">
            <tbody>
              <tr>
                <td className='card-box'>
                    <div className="stat-card">📚 Total Books <br /> {stats.totalBooks}</div>
                </td>
                <td className='card-box'>
                   <div className="stat-card">👤 Total Authors <br /> {stats.totalAuthors}</div>       
                </td>
            </tr>
            <tr>
                <td className='card-box'>
                <div className="stat-card">🏢 Total Publishers <br /> {stats.totalPublishers}</div>
                </td>
                <td className='card-box'>
                <div className="stat-card">🔖 Active Borrows <br /> {stats.activeBorrows}</div>
                </td>
            </tr>
            </tbody>
            
          </table>
        </div>
      </div>
    </div>

  );
}
