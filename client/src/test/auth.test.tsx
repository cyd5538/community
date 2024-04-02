import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { MemoryRouter } from 'react-router-dom';
import Myprofile from '@/pages/Myprofile';
import Chat from '@/pages/Chat';

const queryClient = new QueryClient();

describe("페이지 auth 테스트", () => {
  test('로그인하고 /me 들어갔을경우 내 정보가 보여야됨', async () => {

    render(
      <MemoryRouter>
        <ProtectedRoute user={true} redirectTo="/login">
          <QueryClientProvider client={queryClient}>
            <Myprofile />
          </QueryClientProvider>
        </ProtectedRoute>
      </MemoryRouter>
    );

    const text = screen.queryByText('내 정보');
    expect(text).toBeInTheDocument();
  });

  test('로그인하지 않고 /me 들어갔을경우 내 정보가 보이면 안됨', async () => {

    render(
      <MemoryRouter>
        <ProtectedRoute user={false} redirectTo="/login">
          <QueryClientProvider client={queryClient}>
            <Myprofile />
          </QueryClientProvider>
        </ProtectedRoute>
      </MemoryRouter>
    );

    const text = screen.queryByText('내 정보');
    expect(text).toBeNull();
  });

  test('로그인하고 /room/:id 들어갔을 경우 input placeholder chat이 있어야 함', async () => {

    render(
      <MemoryRouter>
        <ProtectedRoute user={true} redirectTo="/login">
          <QueryClientProvider client={queryClient}>
            <Chat />
          </QueryClientProvider>
        </ProtectedRoute>
      </MemoryRouter>
    );

    const input = screen.queryByPlaceholderText('chat')
    expect(input).toBeInTheDocument();
  });

  test('로그인 하지 않고 /room/:id 들어갔을 경우 input placeholder chat이 없어야 함.', async () => {

    render(
      <MemoryRouter>
        <ProtectedRoute user={false} redirectTo="/login">
          <QueryClientProvider client={queryClient}>
            <Chat />
          </QueryClientProvider>
        </ProtectedRoute>
      </MemoryRouter>
    );

    const input = screen.queryByPlaceholderText('chat')
    expect(input).toBeNull();
  });
})
