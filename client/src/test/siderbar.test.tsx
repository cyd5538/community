import Sidebars from '@/components/sidebar/Sidebars';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';



describe("사이드바 테스트", () => {

  test('메뉴 아이콘이 7개보다 많은지', async () => {
    render(
      <MemoryRouter>
        <Sidebars />
      </MemoryRouter>
    );

    const menuItems = screen.getAllByRole('link');
    expect(menuItems.length).toBeGreaterThan(7);
  });

  test('사이드바가 잘 열고 닫히는지 테스트', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Sidebars />
      </MemoryRouter>
    );
  
    const toggleButton = getByTestId('toggle-button');
    const sidebar = getByTestId('sidebar');
   

    fireEvent.click(toggleButton);
    const roundBackIcon = getByTestId('arrow-roundBack-icon');

    expect(sidebar).toHaveClass('w-40');
    expect(roundBackIcon).toBeInTheDocument();

    fireEvent.click(toggleButton);
    const roundForwardIcon = getByTestId('arrow-roundForward-icon');

    expect(sidebar).toHaveClass('w-[70px]');
    expect(roundForwardIcon).toBeInTheDocument();
  });

  test('로그인한 경우 메뉴 렌더링 테스트', async () => {
    const mockUser = vi.fn();

    vi.mock('useAuth', () => {
      return {
        user: mockUser(true),
        logout: vi.fn(),
      };
    });

    render(
      <MemoryRouter>
        <Sidebars />
      </MemoryRouter>
    );
  
    // user가 true면 login, sign up이 보이면 안됨
    expect(screen.queryByRole('link', { name: 'Login' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Sign up' })).not.toBeInTheDocument();
  });

  test('로그인 안한 경우 메뉴 렌더링 테스트', async () => {
    const mockUser = vi.fn();

    vi.mock('useAuth', () => {
      return {
        user: mockUser(false),
        logout: vi.fn(),
      };
    });

    render(
      <MemoryRouter>
        <Sidebars />
      </MemoryRouter>
    );
  
    // user가 false면 Logout이 보이면 안됨
    expect(screen.queryByRole('link', { name: 'Logout' })).not.toBeInTheDocument();
  });
})
