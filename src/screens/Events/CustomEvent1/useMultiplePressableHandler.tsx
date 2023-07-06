import {useHandler, useEvent} from 'react-native-reanimated';
import {MultiplePressableData} from '../../../components/MultiplePressable/types';
import {NativeSyntheticEvent} from 'react-native';

export function useAnimatedMultiplePressableHandler<
  TContext extends Record<string, unknown>,
>(
  handlers: {
    onMultiplePress: (e: MultiplePressableData, context: TContext) => void;
  },
  dependencies?: ReadonlyArray<unknown>,
): (e: NativeSyntheticEvent<MultiplePressableData>) => void {
  const {context, doDependenciesDiffer} = useHandler<
    MultiplePressableData,
    TContext
  >(handlers, dependencies);

  return useEvent<MultiplePressableData>(
    event => {
      'worklet';
      const {onMultiplePress} = handlers;

      if (onMultiplePress) {
        onMultiplePress(event, context);
      }
    },
    ['onMultiplePress'],
    doDependenciesDiffer,
  );
}
