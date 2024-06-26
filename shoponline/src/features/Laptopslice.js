import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

const initialState ={
loading: false,
    error: null,
    laptopData: null,
    laptopdatabyid:null,
    cart:[],
}

// fetching the filtred data of laptop in redux using asyncthunk
export const fetchlaptop = createAsyncThunk('get/fetchfilteredlaptop', async (type) => {
  try {
      const response = await fetch(`http://localhost:5000/api/admin/filtered-data?type=${type}`);
      if (!response.ok) {
          throw new Error('Failed to fetch');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching laptop data:', error);
      throw error;
  }
});

// fetch the data by id
  export const fetchlaptopbyid = createAsyncThunk(`laptop/fetchlaptopbyid`, async (laptopid) => {
    const response = await fetch(`http://localhost:5000/api/admin/laptop/${laptopid}`)
    return await  response.json()
  })

export const Laptopslice = createSlice({
    name: "laptopslice",
    initialState,
    reducers: {
      addtocart:(state,action)=>{
        return {
          ...state,
          cart: [...state.cart, action.payload] // Add the payload to the cart array
        };
      },
      reset:(state,action)=>{
        return {...state,cart:[]}
      },
      deletecart:(state,action)=>{
        const index=action.payload;
        return {...state,
        cart:[
          ...state.cart.slice(0, index),
          ...state.cart.slice(index + 1),
        ]}
      }
    },
    // extrareducers allows you to handle actions from other slices or additional reducer logic that doesn't belong 
    // to a specific action creator defined within the slice.
    extraReducers: (builder) => {
        builder
        // .addCase() is a method provided by Redux Toolkit's createSlice 
        // function for defining reducer logic. It allows you to define how your slice's
        //  state should be updated in response to specific actions.
          .addCase(fetchlaptop.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchlaptop.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.laptopData = action.payload;
          })
          .addCase(fetchlaptop.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(fetchlaptopbyid.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchlaptopbyid.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.laptopdatabyid = action.payload;
          })
          .addCase(fetchlaptopbyid.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      }
});

export const laptopdata=(state)=>state.laptopslice.laptopData;
export const  laptopError=(state)=>state.laptopslice.error;
export  const  laptopLoading=(state)=>state.laptopslice.loading;
export const laptopdataid=(state)=>state.laptopslice.laptopdatabyid;
export const cart=(state)=>state.laptopslice.cart;
// The function below is called a selector and returns a value based on the current state of the store.
export const {addtocart,reset,deletecart}=Laptopslice.actions
export default Laptopslice.reducer;