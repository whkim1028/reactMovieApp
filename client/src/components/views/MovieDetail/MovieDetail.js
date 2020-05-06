import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import { Row } from "antd";
import GridCards from "../Commons/GridCards";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Crew, setCrew] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  //처음 컴포넌트가 렌더링될때 실행될 부분을 코딩하는 함수
  useEffect(() => {
    const endPointMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    const endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    fetch(endPointMovieInfo)
      .then((response) => response.json())
      .then((response) => setMovie(response));

    fetch(endPointCrew)
      .then((response) => response.json())
      .then((response) => setCrew(response.cast));
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/*header*/}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      ></MainImage>
      {/*body*/}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/*movieInfo*/}
        <MovieInfo movie={Movie}></MovieInfo>
        <br />
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={toggleActorView}>Toggle Actor View</button>
        </div>

        {/*ActorsGrid*/}
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Crew &&
              Crew.map((crew, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      crew.profile_path
                        ? `${IMAGE_BASE_URL}w500${crew.profile_path}`
                        : null
                    }
                    crewName={crew.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
