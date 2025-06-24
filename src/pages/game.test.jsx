import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game from './game';
import '@testing-library/jest-dom';

// react-router-domのモック
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

// Audioオブジェクトのモック
global.Audio = jest.fn(() => ({
  play: jest.fn().mockResolvedValue(undefined),
  pause: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  loop: false,
  volume: 1,
  currentTime: 0,
}));

// jest.useFakeTimersを使用してsetTimeoutをモック
jest.useFakeTimers();

describe('Game Component', () => {
  beforeEach(() => {
    // 各テストの前にモックをクリア
    mockedNavigate.mockClear();
    global.Audio.mockClear();
     // Gameコンポーネントをレンダリング
    render(<Game />);
  });

  test('初期状態で12枚のカードが表示される', () => {
    const cardImages = screen.getAllByRole('img');
    // card0.jpeg（裏面の画像）が12枚あることを確認
    expect(cardImages).toHaveLength(12);
    cardImages.forEach(img => {
        expect(img).toHaveAttribute('src', '/images/card0.jpeg');
    });
  });

  test('カードをクリックすると裏返る', async () => {
    const cardImages = screen.getAllByRole('img');
    await userEvent.click(cardImages[0]);

    // waitForでDOMの更新を待ってからアサーション
    await waitFor(() => {
      expect(screen.getAllByRole('img')[0]).not.toHaveAttribute('src', '/images/card0.jpeg');
    });
  });

  test('ペアが揃わない場合、カードが元に戻る', async () => {
    const cardImages = screen.getAllByRole('img');

    // 異なるカードを2枚クリック
    await userEvent.click(cardImages[0]);
    await userEvent.click(cardImages[1]);
    
    // まず2枚がめくれたことを確認
    await waitFor(() => {
      const updatedImages = screen.getAllByRole('img');
      expect(updatedImages[0]).not.toHaveAttribute('src', '/images/card0.jpeg');
      expect(updatedImages[1]).not.toHaveAttribute('src', '/images/card0.jpeg');
    });

    // 1秒待機してタイマーを実行
    jest.advanceTimersByTime(1000);

    // カードが裏面に戻っていることを確認
    await waitFor(() => {
      expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', '/images/card0.jpeg');
      expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', '/images/card0.jpeg');
    });
  });
}); 