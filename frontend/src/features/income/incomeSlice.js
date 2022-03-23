import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import incomeService from './incomeService'

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new income
export const createIncome = createAsyncThunk(
  'Income/create',
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.createGoal(goalData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user incomes
export const getIncome = createAsyncThunk(
  'Income/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.getGoals(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user income
export const deleteIncome = createAsyncThunk(
  'Income/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.deleteGoal(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIncome.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createIncome.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data.push(action.payload)
      })
      .addCase(createIncome.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getIncome.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getIncome.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
      })
      .addCase(getIncome.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteIncome.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = state.data.filter(
          (income) => income._id !== action.payload.id
        )
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = incomeSlice.actions
export default incomeSlice.reducer
