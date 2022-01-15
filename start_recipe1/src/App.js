import ExpenseItem from "./components/ExpenseItem";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./blog.css";
import "~slick-carousel/slick/slick.css";
import "~slick-carousel/slick/slick-theme.css";
// 경로 표현시 . 은 현재폴더
// .. 은 상위 폴더를 의미한다.

// 키보드로 드래그할때, ctrl + home은 해당줄 제일 앞까지
// ctrl + end는 해당줄 제일 뒤까지
function App() {
  return (
    <div>
      <div class="container">
        <header className="blog-header py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            {/* <div className="col-4 pt-1">
              <a className="link-secondary" href="#">
                Subscribe
              </a>
            </div> */}
            <div className="col-4 text-center">
              <a className="blog-header-logo logo-text" href="#">
                오늘의 민족
              </a>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <a className="link-secondary" href="#" aria-label="Search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="mx-3"
                  role="img"
                  viewBox="0 0 24 24"
                >
                  <title>Search</title>
                  <circle cx="10.5" cy="10.5" r="7.5" />
                  <path d="M21 21l-5.2-5.2" />
                </svg>
              </a>
              <a className="btn btn-sm btn-outline-success btn-text " href="#">
                Sign up
              </a>
            </div>
          </div>
        </header>

        <div className="nav-scroller py-1 mb-2">
          <nav className="nav d-flex justify-content-around">
            <a className="p-2 link-secondary nav-title" href="#">
              추천
            </a>
            <a className="p-2 link-secondary nav-title" href="#">
              분류
            </a>
            <a className="p-2 link-secondary nav-title" href="#">
              맛집
            </a>
            <a className="p-2 link-secondary nav-title" href="#">
              회원 정보
            </a>
          </nav>
        </div>
      </div>
      <main className="container">
        <div className="p-4 p-md-5 mb-4 text-white rounded  title-bg">
          <div className="col-md-6 px-0">
            <h1 className="display-4 fst-italic">
              Title of a longer featured blog post
            </h1>
            <p className="lead my-3">
              Multiple lines of text that form the lede, informing new readers
              quickly and efficiently about what’s most interesting in this
              post’s contents.
            </p>
            <p className="lead mb-0">
              <a href="#" className="text-white fw-bold">
                Continue reading...
              </a>
            </p>
          </div>
        </div>

        <div
          id="carouselExampleControls"
          className="carousel slide youtube"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="col-md-6">
                <img
                  src="food.png"
                  className="d-block imgwidth"
                  alt="..."
                ></img>
                <img
                  src="food.png"
                  className="d-block imgwidth"
                  alt="..."
                ></img>
              </div>
            </div>
            <div class="carousel-item">
              <img src="..." className="d-block w-100" alt="..."></img>
            </div>
            <div class="carousel-item">
              <img src="..." className="d-block w-100" alt="..."></img>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
