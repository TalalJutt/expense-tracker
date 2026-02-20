import React, { useState } from "react"
import { collection, addDoc, doc, setDoc } from "firebase/firestore/lite";
import { fireStore } from "../config/firebase";
import { toast } from 'react-toastify';

const initialState = { title: "", description: "", price: "" }

export default function AddProducts() {

  const [state, setState] = useState(initialState)

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(state)

    const { title, description, price } = state

    try {
      const docRef = await addDoc(collection(fireStore, "products"), { title, description, price });
      console.log("Document written with ID: ", docRef.id);
      toast.success("Product added successfully!");
      setState(initialState);
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Failed to add product. Please try again.");
    }

  }
  ///const handleSubmit = async (e) => {
  //e.preventDefault();

  //console.log(state)

  //const { fullName, age, country } = state

  //let randomId = Math.random().toString(36).slice(2)
  //console.log(randomId)

  //try {
  // await setDoc(doc(fireStore, "users", "randomId"), {fullName, age, country, id: randomId });
  //console.log("Document written with ID: ", docRef.id);
  // console.log("Document written with ID: ", randomId);
  //} catch (e) {
  //console.error("Error adding document: ", e);
  //}

  //}

  return (
    <main>
      <div className='py-5 w-100'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'>
              <div className="card p-2 p-md-4 p-lg-5">
                <h2 className='text-center mb-4'>Add Product Form</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col">
                      <input type="text" className="form-control" placeholder="Title" name="title" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <input type="number" className="form-control" placeholder="Price" name="price" onChange={handleChange} />
                    </div>
                  </div>
                  < div className="row mb-3">
                    <div className="col">
                      <input type="text" className="form-control" placeholder="Description" name="description" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="row">
                    <div className='col text-center'>
                      <button className="btn btn-outline-success w-50">Add Product</button>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}