"use client";

import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App';

const queryClient = new QueryClient();


export default function Home() {


  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>

  )
}
