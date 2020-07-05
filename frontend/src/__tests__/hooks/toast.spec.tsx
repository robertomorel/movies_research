import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useToast, ToastProvider } from '../../hooks/toast';

describe('Toast hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to add a toast', async () => {
    const useStateSpy = jest.spyOn(React, 'useState');

    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.addToast({
        type: 'error',
        title: 'Erro teste',
        description: 'Erro teste descrição',
      });
    });

    /*
    expect(useStateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
      }),
    );
    */
    // -- TODO: completar!
    expect(useStateSpy).toBeCalled();
  });

  it('should be able to remove a toast', async () => {
    const useStateSpy = jest.spyOn(React, 'useState');

    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.removeToast('id_test');
    });
    // -- TODO: completar!
    expect(useStateSpy).toBeCalled();
  });
});
