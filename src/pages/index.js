import { Box, Flex, keyframes, useTheme } from '@chakra-ui/core';
import { useState } from 'react';
import takeRight from 'lodash/takeRight';

const Home = () => {
  const theme = useTheme();
  const [countClicks, setCountClicks] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [taps, setTaps] = useState([]);

  const metronome = keyframes`
    0% {
      background: ${theme.colors.gray[300]};
    }

    50% {
      background: transparent;
    }
  `;

  const onTap = () => {
    if (taps.length === 0) {
      setTaps(takeRight(taps.concat([Date.now()]), 4));
    } else if (
      taps[taps.length - 1] > 0 &&
      Date.now() - taps[taps.length - 1] > 2200
    ) {
      onReset();
    } else {
      const timeDifference = Date.now() - taps[0];
      setTaps(takeRight(taps.concat([Date.now()]), 4));
      setCountClicks(countClicks + 1);
      setBpm(60000 / (timeDifference / taps.length));
    }
  };

  const onReset = () => {
    setTaps([]);
    // setBpm(0);
    setCountClicks(0);
  };

  return (
    <Flex
      p="10"
      h="100vh"
      w="100vw"
      direction="column"
      align="center"
      justify="center"
      onClick={onTap}
      cursor="pointer"
      userSelect="none"
      transition="all 0.2s ease"
      animation={`${metronome} ${60000 / bpm}ms linear infinite running`}
      _active={{ bg: 'gray.200' }}
    >
      <Box
        m="4"
        mt="-0.5em"
        fontSize="clamp(5rem, 20vw, 20rem)"
        w="100vw"
        // h="100vh"
        p="0"
        borderRadius="9999px"
        textAlign="center"
      >
        <Box pos="relative" w="100%">
          <Box letterSpacing="tight" fontFamily="mono">
            <Box>{bpm.toFixed(1)}</Box>
          </Box>
          <Box
            fontSize="0.35em"
            pos="absolute"
            bottom="-0.5em"
            left="0"
            w="100%"
            transition="all 0.7s ease"
            opacity="0.5"
            // opacity={taps.length > 0 && taps.length < 4 ? 0.5 : 0}
          >
            {taps.length > 0 && taps.length < 4 ? 'Keep Tapping' : 'BPM'}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
