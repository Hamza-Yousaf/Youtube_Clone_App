import React, { useEffect, useState } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import SingleVideo from './SingleVideo';
import YouTube from 'simple-youtube-api';
import config from '../../config';
import Suggestions from './Suggestions';
const youtube = new YouTube(config.apiKey);

export default ({ searchString }) => {
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const callApi = async () => {
      const result = await youtube.searchVideos(searchString, 10);
      if (result.length === 0) {
        setError(true);
      } else {
        setError(false);
      }
      setSelectedVideo(result[0]);

      console.log(result);
      setVideoList(result);
    };
    callApi();
  }, [searchString]);

  const selectedVideoCallback = videoDetail => {
    setSelectedVideo(videoDetail);
  };

  return (
    <React.Fragment>
      <Col xs={12} lg={8}>
        {error ? (
          <h1>No result found, please try looking for something else.</h1>
        ) : (
          <SingleVideo detail={selectedVideo} />
        )}
      </Col>
      <Col xs={12} lg={4}>
        {!error && (
          <ListGroup>
            <p>Suggestions</p>
            <Suggestions
              videoList={videoList}
              changeSelection={selectedVideoCallback}
              selectedVideoId={selectedVideo.id}
            />           
          </ListGroup>
        )}
      </Col>
    </React.Fragment>
  );
};
