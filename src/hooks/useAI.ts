import { useMutation } from 'react-query';
import Api from '../api';
import { useCallback, useRef } from 'react';
import type { CakeAIData } from '../types/helpers';

export const useAI = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutation = useMutation((data: CakeAIData) => {
    abortControllerRef.current = new AbortController();
    return Api.text2ImageV2(data, abortControllerRef.current?.signal);
  });

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();

    mutation.reset();
  }, [mutation]);

  return { mutation, reset };
};
