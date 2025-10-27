import { useState, useEffect } from "react";
import './App.css'

import petService from './services/petService';

import PetList from './components/PetList/PetList.jsx';
import PetDetail from './components/PetDetail/PetDetail.jsx';
import PetForm from './components/PetForm/PetForm.jsx';



const App = () => {
  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Create a new useEffect
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const fetchedPets = await petService.index();
        // Don't forget to pass the error object to the new Error
        if (fetchedPets.err) {
          throw new Error(fetchedPets.err);
        }
        setPets(fetchedPets);
      } catch (err) {
        // Log the error object
        console.log(err);
      }
    };
    fetchPets();
  }, []);

  const handleSelect = (pet) => {
    setSelected(pet);
    // Close the form if it's open when a new pet is selected.
    setIsFormOpen(false);
  };

  const handleFormView = (pet) => {
    if (!pet._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
      if (newPet.err) {
        throw new Error(newPet.err);
      }
      setPets([newPet, ...pets]);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }};

  const handleUpdatePet = async (formData, petId) => {
  try {
    const updatedPet = await petService.update(petId, formData);

    // handle potential errors
    if (updatedPet.err) {
      throw new Error(updatedPet.err);
    }

    const updatedPetList = pets.map((pet) => (
      // If the _id of the current pet is not the same as the updated pet's _id,
      // return the existing pet.
      // If the _id's match, instead return the updated pet.
      pet._id !== updatedPet._id ? pet : updatedPet
    ));
    // Set pets state to this updated array
    setPets(updatedPetList);
    // If we don't set selected to the updated pet object, the details page will
    // reference outdated data until the page reloads.
    setSelected(updatedPet);
    setIsFormOpen(false);
  } catch (err) {
    console.log(err);
  }
};

  const handleDeletePet = async (petId) => {
    try {
      const deletedPet = await petService.deletePet(petId);
      if (deletedPet.err) {
        throw new Error(deletedPet.err);
      }
      setPets(pets.filter((pet) => pet._id !== deletedPet._id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PetList 
        pets={pets} 
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
     {isFormOpen ? (
        <PetForm 
        handleAddPet={handleAddPet} 
        selected={selected} 
        handleUpdatePet={handleUpdatePet}
        />
      ) : (
        <PetDetail 
          selected={selected} 
          handleFormView={handleFormView} 
          handleDeletePet={handleDeletePet} 
        />
      )}
    </>
  );
};

export default App;
