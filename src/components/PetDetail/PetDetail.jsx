// src/components/PetDetail/PetDetail.jsx

const PetDetail = (props) => {
  // return if props.selected is null
  if (!props.selected) {
    return (
      <div>
        <h1>NO DETAILS</h1>
      </div>
    );
  }

  // return statement if props.selected has a truthy value
  return (
    <div>
      <h1>{props.selected.name}</h1>
      <h2>Breed: {props.selected.breed}</h2>
      <h2>
        Age: {props.selected.age} year{props.selected.age > 1 ? 's' : ''} old
      </h2>
      {/* Our new button, wrapped in a div */}
      <div>
        <button onClick={() => props.handleFormView(props.selected)}>
          Edit Pet
        </button>
        <button onClick={() => props.handleDeletePet(props.selected._id)}>
          Delete Pet
        </button>
      </div>
    </div>
  );
};

export default PetDetail;
