/* eslint-disable react/prop-types */
import { Button, Card } from "react-bootstrap";
export const HomeCard = (props) => {
  const {
    avatar,
    firstName,
    age,
    profession,
    gender,
    id,
    deleteUser,
    editUser,
  } = props;

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={avatar} />
        <Card.Body>
          <Card.Title>{firstName}</Card.Title>
          <Card.Text>{profession}</Card.Text>
          <Card.Text>{age}</Card.Text>
          <Card.Text>{gender}</Card.Text>
          <div className="d-flex justify-content-end gap-4">
            <Button onClick={() => editUser(id)} variant="primary">
              Edit
            </Button>
            <Button onClick={() => deleteUser(id)} variant="danger">
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HomeCard;
