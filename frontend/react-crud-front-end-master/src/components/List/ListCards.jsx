import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import EditList from "./EditList";
import { useContext, useState } from "react";
import { GlobalContext } from "../../GloblaCotext";

function ListCard({ title, description, id }) {
  const [showMore, setShowMore] = useState(false);
  const { deleteList } = useContext(GlobalContext);
  return (
    <Card style={{ width: "25rem", marginTop: "1rem" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {showMore ? (
            <div>
              {description}
              <a
                role="button"
                className="text-blue cursur-pointer mx-2"
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                Hide
              </a>
            </div>
          ) : (
            <div>
              {description.slice(0, 50)}
              <a
                role="button"
                className="text-blue mx-2"
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                More
              </a>
            </div>
          )}
        </Card.Text>
        <EditList id={id} title={title} description={description} name="EDIT" />
        <Button
          onClick={() => {
            deleteList(id);
          }}
          className="m-2"
          variant="danger"
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ListCard;
