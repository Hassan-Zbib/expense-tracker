import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import expenseService from './expenseService'

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new expense
export const createExpense = createAsyncThunk(
  'Expense/create',
  async (expenseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await expenseService.createExpense(expenseData, token)
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

// Get user expenses
export const getExpenses = createAsyncThunk(
  'Expense/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await expenseService.getExpenses(token)
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

// Delete user expense
export const deleteExpense = createAsyncThunk(
  'Expense/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await expenseService.deleteExpense(id, token)
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

// Update user expense
export const updateExpense = createAsyncThunk(
    'Expense/update',
    async (id, expenseData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.accessToken
        return await expenseService.updateExpense(id, expenseData, token)
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

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
        // Post Side effects
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data.push(action.payload)
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Get Side effects
      .addCase(getExpenses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Delete Side effects
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = state.data.filter(
          (expense) => expense._id !== action.payload.id
        )
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Update Side effects
      .addCase(updateExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = state.data.map(
          (expense) => {
              if (expense._id === action.payload._id) {
                  return action.payload
              }
        })
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = expenseSlice.actions
export default expenseSlice.reducer
