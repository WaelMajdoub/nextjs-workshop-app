import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { HiOutlineMail } from 'react-icons/hi';

function Footer() {
  return (
    <Box bg="#424272" py="20px" px="30px">
      <Flex justify="center" mb="20px">
        <Link href="https://www.instagram.com" mr="20px" color="white">
          <FaInstagram size={20} />
        </Link>
        <Link href="https://www.facebook.com" mr="20px" color="white">
          <FaFacebook size={20} />
        </Link>
        <Link href="https://www.twitter.com" color="white">
          <FaTwitter size={20} />
        </Link>
      </Flex>
      <Flex justify="space-between" alignItems="center">
        <Box textAlign="center">
          <Text fontSize="sm" fontWeight="medium" color="white">
            &copy; 2023 My Website
          </Text>
          <Text fontSize="xs" color="white">
            All rights reserved.
          </Text>
        </Box>
        <Flex>
          <Link href="/about" mr="20px" color="white">
            <IoMdInformationCircleOutline size={20} />
          </Link>
          <Link href="/contact" color="white">
            <HiOutlineMail size={20} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;