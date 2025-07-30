import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function AppProviders({ children }) {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
