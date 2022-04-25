// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract Accessory {
    function get(uint256 i) external view returns(string memory){
        string[2] memory accessories = [
            string(abi.encodePacked('<>{/* The default option is "no accessory" */}</>')),
            string(abi.encodePacked('<path fill="#000" d="M901.985 377.503c-15.008 7.308-35.946-3.47-46.037-14.76-3.673-4.111-6.507-15.872-5.094-23.331 3.827-20.201 18.207-32.325 33.388-36.465 21.044-5.74 42.222 8.802 39.753 25.963-2.341 16.264-5.888 39.855-22.01 48.593m-102.151-38.804c-1.203 22.015-18.69 41.283-39.59 46.993-33.674 9.499-50.316-14.432-57.854-40.214-.749-2.562-2.51-10.381 2.215-17.088 18.583-26.382 63.796-21.885 86.378-14.642 6.61 6.39 9.312 15.614 8.851 24.951m118.457-37.97c-.01.013-.022.024-.032.038-.077-.048-.153-.096-.232-.143.087.036.179.068.264.105m28.174 2.545c-1.956-22.414-71.519-13.832-79.652-11.995-22.196 6.6-41.367 24.556-66.183 16.663-25.713-28.979-112.302-20.668-130.454-5.907-3.436-1.362-7.614-.631-12.041.655-22.734-.831-126.518 7.093-105.29 36.427 3.222 2.259 6.441-.04 6.53-4.694 110.663-40.387 99.936-2.558 113.06-6.976 2.004.583 4.095.952 5.924 1.34 10.158 3.304 13.607 2.283 14.945 13.812 9.193 89.019 126.448 58.295 116.831-14.723 9.522-.53 17.851-4.693 27.92-.628 6.991 68.785 61.742 71.561 78.219 47.717 12.425-16.55 7.498-41.526 24.577-54.546 6.742 5.704 7.176-13.547 5.614-17.145"/>'))
        ];
        return accessories[i];
    }
}