import Card from "../components/shared/Card";
import { Link } from "react-router-dom";
//type AboutPageProps = {};

const AboutPage = () => {
  return (
    <Card>
      <div className="about">
        <h1>About this Project</h1>
        <p>This is a React app to leave feedback</p>
        <p>Version: 1.0.0</p>
        <p>
          <Link to="/">Back To Home</Link>
        </p>
      </div>
    </Card>
  );
};

export default AboutPage;
