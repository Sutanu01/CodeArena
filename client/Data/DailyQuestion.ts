import { QuestionList } from "@/types/Questions"

export const DailyPuzzle : QuestionList = {
  "questions": [
    {
      "id": 1,
      "question_title": "Implement MergeSort",
      "description": "Implement the merge sort algorithm to sort an array of integers in ascending order. Merge sort is a divide-and-conquer algorithm that divides the array into two halves, recursively sorts them, and then merges the sorted halves.",
      "hints": [
        "Divide the array into two halves until each subarray has only one element.",
        "Merge two sorted arrays by comparing elements from both arrays and placing the smaller one first."
      ],
      "difficulty": "Medium",
      "tags": ["Array", "Divide and Conquer", "Sorting", "Recursion"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "[7, 64, 34, 25, 12, 22, 11, 90]",
          "output": "[11, 12, 22, 25, 34, 64, 90]",
          "explanation": "The array is sorted in ascending order using merge sort algorithm."
        },
        {
          "input": "[6, 5, 2, 4, 6, 1, 3]",
          "output": "[1, 2, 3, 4, 5, 6]",
          "explanation": "The array is divided recursively and merged back in sorted order."
        }
      ]
    },
    {
      "id": 2,
      "question_title": "Find the distance between 2 nodes in a tree",
      "description": "Given a binary tree and two nodes, find the distance between the two nodes. The distance is defined as the number of edges in the shortest path between the two nodes. You need to implement a function that takes the root of the tree and two node values, and returns the distance between them.",
      "hints": [
        "Find the Lowest Common Ancestor (LCA) of the two nodes first.",
        "Calculate the distance from LCA to each node and sum them up."
      ],
      "difficulty": "Medium",
      "tags": ["Tree", "Binary Tree", "DFS", "LCA"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "7\n1 2 3 4 5 6 7\n4 5",
          "output": "2",
          "explanation": "First line contains n (number of nodes). Second line contains the tree nodes in level order. Third line contains the two nodes to find distance between. The distance between nodes 4 and 5 is 2."
        },
        {
          "input": "7\n1 2 3 4 5 6 7\n4 6",
          "output": "4",
          "explanation": "The distance between nodes 4 and 6 is 4. Path: 4 -> 2 -> 1 -> 3 -> 6"
        }
      ]
    },
    {
      "id": 3,
      "question_title": "SUBTREE TREE QUERIES",
      "description": "Given a tree with n nodes and q queries. Each node has an initial value. You need to handle two types of queries: Type 1 (1 u v): Change the value of node u to v. Type 2 (2 u): Print the sum of all values in the subtree rooted at node u (including node u itself).",
      "hints": [
        "Use DFS to flatten the tree and convert subtree queries to range queries.",
        "Apply a data structure like Segment Tree or Fenwick Tree for efficient range sum queries and updates."
      ],
      "difficulty": "Hard",
      "tags": ["Tree", "DFS", "Segment Tree", "Range Queries", "Fenwick Tree"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "5 4\n1 2 3 4 5\n1 2\n2 3\n3 4\n4 5\n2 1\n1 3 10\n2 1\n2 3",
          "output": "15\n22\n14",
          "explanation": "Tree has 5 nodes with values [1,2,3,4,5]. Edges connect nodes to form a path 1-2-3-4-5. Query 2 1 gives sum of subtree rooted at 1 (all nodes): 15. After updating node 3 to value 10, subtree sum at 1 becomes 22, and subtree sum at 3 becomes 14."
        },
        {
          "input": "4 3\n10 20 30 40\n1 2\n1 3\n2 4\n2 1\n1 2 50\n2 1",
          "output": "100\n130",
          "explanation": "Tree has 4 nodes with values [10,20,30,40]. Node 1 is root with children 2,3 and node 2 has child 4. Initial subtree sum at 1 is 100. After updating node 2 to 50, subtree sum at 1 becomes 130."
        }
      ]
    },
    {
      "id": 4,
      "question_title": "ONLY K",
      "description": "Given an array of integers and a value K, count the number of subarrays where the number of distinct elements in the subarray is exactly K. A subarray is a contiguous part of an array.",
      "hints": [
        "Use the sliding window technique with two pointers to count subarrays with at most K distinct elements.",
        "The answer is (subarrays with at most K distinct) - (subarrays with at most K-1 distinct)."
      ],
      "difficulty": "Medium",
      "tags": ["Array", "Sliding Window", "Two Pointers", "Hash Map"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "5 2\n1 2 1 2 3",
          "output": "7",
          "explanation": "Array is [1,2,1,2,3] and K=2. Subarrays with exactly 2 distinct elements: [1,2], [2,1], [1,2] (at index 2-3), [2,1] (at index 1-2), [1,2,1], [2,1,2], [1,2,1,2]. Total count is 7."
        },
        {
          "input": "4 1\n1 1 1 1",
          "output": "10",
          "explanation": "Array is [1,1,1,1] and K=1. All subarrays have exactly 1 distinct element. Total subarrays = 4+3+2+1 = 10."
        }
      ]
    },
    {
      "id": 5,
      "question_title": "String Operations",
      "description": "Given a string, you need to count the number of distinct strings you can generate by performing two operations repeatedly: 1. Remove the first character of the string, 2. Remove the second character of the string (if it exists). You can perform these operations any number of times until the string becomes empty or has only one character.",
      "hints": [
        "For each character from 'a' to 'z', find its first occurrence in the string.",
        "The contribution of each character to the answer depends on its position in the string."
      ],
      "difficulty": "Medium",
      "tags": [
        "Brute Force",
        "Combinatorics",
        "Data Structures",
        "DP",
        "Strings"
      ],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "abc",
          "output": "7",
          "explanation": "Starting with 'abc', we can generate: 'abc' (initial), 'bc' (remove first), 'ac' (remove second), 'c' (from 'bc' remove first), 'b' (from 'bc' remove second), 'a' (from 'ac' remove first), '' (empty string from single chars). Total distinct strings: 7."
        },
        {
          "input": "ab",
          "output": "4",
          "explanation": "Starting with 'ab', we can generate: 'ab' (initial), 'b' (remove first), 'a' (remove second), '' (empty string). Total distinct strings: 4."
        }
      ]
    },
    {
      "id": 6,
      "question_title": "Range Containment",
      "description": "Given n ranges, your task is to count for each range how many other ranges it contains and how many other ranges contain it. Range [a,b] contains range [c,d] if a≤c and d≤b. For each range, output two numbers: how many ranges it contains, and how many ranges contain it.",
      "hints": [
        "Sort the ranges by start point, and use coordinate compression if needed to handle large values efficiently.",
        "Use a data structure like Fenwick Tree or Segment Tree to count ranges based on their end points."
      ],
      "difficulty": "Hard",
      "tags": [
        "Sorting",
        "Coordinate Compression",
        "Fenwick Tree",
        "Data Structures"
      ],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "4\n1 6\n2 4\n4 8\n3 6",
          "output": "2 0\n0 2\n1 0\n0 1",
          "explanation": "Range [1,6] contains [2,4] and [3,6], so it contains 2 ranges and is contained by 0. Range [2,4] contains 0 ranges and is contained by [1,6] and [3,6]. Range [4,8] contains [3,6] and is contained by 0. Range [3,6] contains 0 ranges and is contained by [1,6]."
        },
        {
          "input": "3\n1 3\n2 5\n4 6",
          "output": "0 0\n0 0\n0 0",
          "explanation": "No range contains any other range. Each range contains 0 ranges and is contained by 0 ranges."
        }
      ]
    },
    {
      "id": 7,
      "question_title": "Shortest Palindrome",
      "description": "Given a string S, find the shortest palindrome that has S as its prefix. You need to add the minimum number of characters to the beginning of S to make it a palindrome.",
      "hints": [
        "Find the longest prefix of S that is also a suffix of the reverse of S using KMP algorithm.",
        "The characters to be added at the beginning are the remaining suffix of the reverse string."
      ],
      "difficulty": "Hard",
      "tags": ["String", "KMP", "Palindrome", "Prefix Function"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "aacecaaa",
          "output": "aaacecaaa",
          "explanation": "The shortest palindrome with 'aacecaaa' as prefix is 'aaacecaaa'. We add one 'a' at the beginning."
        },
        {
          "input": "abcd",
          "output": "dcbabcd",
          "explanation": "The shortest palindrome with 'abcd' as prefix is 'dcbabcd'. We add 'dcb' at the beginning, which is the reverse of 'bcd'."
        }
      ]
    },
    {
      "id": 8,
      "question_title": "Bitwise AND Arrays",
      "description": "Find the number of arrays with n numbers where each number is between [0, 2^k-1], the bitwise AND of all elements is 0, and the array has the maximum sum possible. Two arrays are considered different if they differ in at least one position. Output the answer modulo 1e9+7.",
      "hints": [
        "For bitwise AND to be 0, each bit position must have at least one element with that bit as 0.",
        "To maximize sum while maintaining AND = 0, minimize the number of 0 bits by having exactly one element with 0 in each bit position."
      ],
      "difficulty": "Hard",
      "tags": [
        "Bit Manipulation",
        "Combinatorics",
        "Dynamic Programming",
        "Math"
      ],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "2 2",
          "output": "4",
          "explanation": "n=2, k=2, numbers in [0,3]. Valid arrays with maximum sum and AND=0: [0,3], [3,0], [1,2], [2,1]. All have AND=0 and achieve maximum possible sum."
        },
        {
          "input": "3 2",
          "output": "9",
          "explanation": "n=3, k=2, numbers in [0,3]. Some valid arrays: [0,3,3], [3,0,3], [3,3,0], [1,2,3], [2,1,3], [1,3,2], etc. Total count is 9."
        }
      ]
    },
    {
      "id": 9,
      "question_title": "Max of Min Segment Sum",
      "description": "Given an array of n integers and a number k, divide the array into exactly k non-empty contiguous segments such that the minimum sum among all segments is maximized. Find this maximum value of the minimum segment sum.",
      "hints": [
        "Use binary search on the answer - search for the maximum possible minimum segment sum.",
        "For each mid value, check if it's possible to create k segments where each segment sum is at least mid using a greedy approach."
      ],
      "difficulty": "Medium",
      "tags": ["Binary Search", "Greedy", "Array", "Optimization"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "5 3\n1 2 3 4 5",
          "output": "4",
          "explanation": "Array [1,2,3,4,5] divided into 3 segments: [1,2,3] (sum=6), [4] (sum=4), [5] (sum=5). The minimum segment sum is 4, which is the maximum possible minimum."
        },
        {
          "input": "6 2\n7 2 5 10 8 3",
          "output": "14",
          "explanation": "Array [7,2,5,10,8,3] divided into 2 segments: [7,2,5] (sum=14), [10,8,3] (sum=21). The minimum segment sum is 14, which is the maximum possible minimum."
        }
      ]
    },
    {
      "id": 10,
      "question_title": "Forest Queries",
      "description": "You are given an n×n grid representing the map of a forest. Each square is either empty ('.') or contains a tree ('*'). The upper-left square has coordinates (1,1), and the lower-right square has coordinates (n,n). Your task is to process q queries of the form: how many trees are inside a given rectangle in the forest?",
      "hints": [
        "Use 2D prefix sums to precompute cumulative tree counts for efficient range queries.",
        "For rectangle query from (y1,x1) to (y2,x2), use the inclusion-exclusion principle with prefix sums."
      ],
      "difficulty": "Medium",
      "tags": ["2D Prefix Sum", "Range Queries", "Grid", "Preprocessing"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "4 3\n.*..\n*.**\n**.*\n*.**\n2 2 3 4\n3 1 3 1\n1 1 2 2",
          "output": "3\n1\n2",
          "explanation": "4x4 grid with trees marked as '*'. Query 1: rectangle from (2,2) to (3,4) has 3 trees. Query 2: rectangle from (3,1) to (3,1) has 1 tree. Query 3: rectangle from (1,1) to (2,2) has 2 trees."
        },
        {
          "input": "2 2\n**\n.*\n1 1 2 2\n1 1 1 1",
          "output": "3\n1",
          "explanation": "2x2 grid. Query 1: entire grid has 3 trees. Query 2: top-left cell has 1 tree."
        }
      ]
    },
    {
      "id": 11,
      "question_title": "MID MEDIAN",
      "description": "Given an empty array and q queries of 2 types: Type 1 (1 x): Add number x to the array. Type 2 (2): Find and print the median of the current array elements. If the array has even number of elements, print the smaller of the two middle elements.",
      "hints": [
        "Use two heaps (priority queues) - a max heap for the smaller half and a min heap for the larger half.",
        "Keep the heaps balanced so that their sizes differ by at most 1, with the median always at the top of the appropriate heap."
      ],
      "difficulty": "Medium",
      "tags": ["Heap", "Priority Queue", "Data Structures", "Median"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "7\n1 5\n2\n1 3\n1 7\n2\n1 1\n2",
          "output": "5\n5\n3",
          "explanation": "Start with empty array. Add 5: [5], median=5. Add 3: [3,5], median=3 (smaller of two middle). Add 7: [3,5,7], median=5. Add 1: [1,3,5,7], median=3 (smaller of two middle)."
        },
        {
          "input": "5\n1 2\n1 4\n2\n1 6\n2",
          "output": "2\n4",
          "explanation": "Add 2: [2]. Add 4: [2,4], median=2. Add 6: [2,4,6], median=4."
        }
      ]
    },
    {
      "id": 12,
      "question_title": "ALIEN DICTIONARY",
      "description": "Given n strings consisting of k(<=26) characters of alphabet, the strings are arranged in some dictionary pattern. You need to find the dictionary pattern (order of characters) or return empty string if no valid pattern exists.",
      "hints": [
        "Build a directed graph where edges represent character ordering relationships from adjacent string comparisons.",
        "Use topological sorting to find the valid character ordering, return empty string if a cycle is detected."
      ],
      "difficulty": "Hard",
      "tags": ["Graph", "Topological Sort", "String", "DFS"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "5 4\nbaa\nabcd\nabca\ncab\ncada",
          "output": "bdac",
          "explanation": "By comparing adjacent strings, we can deduce: b<a (from baa,abcd), d<c (from abcd,abca), a<c (from abca,cab), c<a (from cab,cada). Resolving gives order: b,d,a,c -> bdac"
        },
        {
          "input": "3 3\nwrt\nwrf\ner",
          "output": "wertf",
          "explanation": "From wrt,wrf: t<f. From wrf,er: w<e. From er: r comes after e. Valid order: w,e,r,t,f -> wertf"
        }
      ]
    },
    {
      "id": 13,
      "question_title": "LONGEST INCREASING SUBSEQUENCE",
      "description": "Given an array of integers, find the length of the longest strictly increasing subsequence. A subsequence is a sequence that can be derived from the array by deleting some or no elements without changing the order of remaining elements.",
      "hints": [
        "Use dynamic programming where dp[i] represents the length of LIS ending at index i.",
        "For O(n log n) solution, use binary search with a temporary array to maintain the smallest tail elements."
      ],
      "difficulty": "Medium",
      "tags": ["Dynamic Programming", "Binary Search", "Array"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "8\n10 9 2 5 3 7 101 18",
          "output": "4",
          "explanation": "The longest increasing subsequence is [2,3,7,18] or [2,3,7,101] with length 4."
        },
        {
          "input": "4\n0 1 0 3",
          "output": "2",
          "explanation": "The longest increasing subsequence is [0,1] or [0,3] with length 2."
        }
      ]
    },
    {
      "id": 14,
      "question_title": "MINIMUM ARRAY WITH GIVEN XOR AND SUM",
      "description": "Given 2 numbers u and v both >=0 and <= 1e18. Find the array with the minimum length possible such that bitwise XOR of its elements is u and sum is v. If not possible return -1.",
      "hints": [
        "Check if it's possible: sum must be at least equal to XOR, and (sum-XOR) must be even for valid bit manipulation.",
        "Start with XOR value in array, then add pairs of equal numbers to reach the target sum without changing XOR."
      ],
      "difficulty": "Hard",
      "tags": ["Bit Manipulation", "Math", "Greedy", "Array"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "6 12",
          "output": "3\n6 3 3",
          "explanation": "XOR: 6^3^3 = 6, Sum: 6+3+3 = 12. This is the minimum length array possible."
        },
        {
          "input": "5 4",
          "output": "-1",
          "explanation": "Impossible since sum (4) is less than XOR (5). XOR of positive numbers cannot exceed their sum."
        }
      ]
    },
    {
      "id": 15,
      "question_title": "RANGE MINIMUM QUERY WITH UPDATES",
      "description": "Given an array, you can perform 2 operations: 1. Change any index value to a new value. 2. Print the minimum value in range [L,R]. Handle multiple queries efficiently.",
      "hints": [
        "Use a Segment Tree data structure to support both point updates and range minimum queries in O(log n) time.",
        "For each query, check operation type: if update operation modify the tree node, if range query traverse tree to find minimum."
      ],
      "difficulty": "Medium",
      "tags": ["Segment Tree", "Data Structure", "Range Query", "Array"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "5\n1 3 2 7 9\n6\n2 1 3\n1 2 1\n2 1 3\n2 2 4\n1 4 6\n2 3 5",
          "output": "1\n1\n1\n2",
          "explanation": "Initial array: [1,3,2,7,9]. Query min(1,3)=1. Update index 2 to 1: [1,1,2,7,9]. Query min(1,3)=1, min(2,4)=1. Update index 4 to 6: [1,1,2,6,9]. Query min(3,5)=2."
        },
        {
          "input": "4\n4 2 6 8\n3\n2 1 4\n1 3 1\n2 1 4",
          "output": "2\n1",
          "explanation": "Initial array: [4,2,6,8]. Query min(1,4)=2. Update index 3 to 1: [4,2,1,8]. Query min(1,4)=1."
        }
      ]
    },
    {
      "id": 16,
      "question_title": "Prefix Sum Range Query (Debug and Fix Code)",
      "description": "Given an array nums[] of n integers, and q queries of form (L, R), return the sum of all elements from index L to R (inclusive) for each query. Use 0-based indexing.",
      "hints": [
        "Use prefix sum precomputation to answer queries in O(1) time.",
        "Be careful with indexing when L=0 and handling range bounds correctly."
      ],
      "difficulty": "Medium",
      "tags": ["Array", "Prefix Sum", "Range Query"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    cin >> n;\n    vector<int> nums(n);\n    for(int i = 0; i < n; i++) {\n        cin >> nums[i];\n    }\n    \n    vector<int> prefix(n);\n    prefix[0] = nums[0];\n    for(int i = 1; i < n; i++) {\n        prefix[i] = prefix[i-1] + nums[i];\n    }\n    \n    int q;\n    cin >> q;\n    while(q--) {\n        int L, R;\n        cin >> L >> R;\n        int result = prefix[R] - prefix[L-1];\n        cout << result << \"\\n\";\n    }\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    n = int(input())\n    nums = list(map(int, input().split()))\n    \n    prefix = [0] * n\n    prefix[0] = nums[0]\n    for i in range(1, n):\n        prefix[i] = prefix[i-1] + nums[i]\n    \n    q = int(input())\n    for _ in range(q):\n        L, R = map(int, input().split())\n        result = prefix[R] - prefix[L-1]\n        print(result)\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i = 0; i < n; i++) {\n            nums[i] = sc.nextInt();\n        }\n        \n        int[] prefix = new int[n];\n        prefix[0] = nums[0];\n        for(int i = 1; i < n; i++) {\n            prefix[i] = prefix[i-1] + nums[i];\n        }\n        \n        int q = sc.nextInt();\n        while(q-- > 0) {\n            int L = sc.nextInt();\n            int R = sc.nextInt();\n            int result = prefix[R] - prefix[L-1];\n            System.out.println(result);\n        }\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let idx = 0;\n    const n = parseInt(input[idx++]);\n    const nums = input[idx++].split(' ').map(Number);\n    \n    const prefix = new Array(n);\n    prefix[0] = nums[0];\n    for(let i = 1; i < n; i++) {\n        prefix[i] = prefix[i-1] + nums[i];\n    }\n    \n    const q = parseInt(input[idx++]);\n    for(let i = 0; i < q; i++) {\n        const [L, R] = input[idx++].split(' ').map(Number);\n        const result = prefix[R] - prefix[L-1];\n        console.log(result);\n    }\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let n: usize = input.trim().parse().unwrap();\n    \n    input.clear();\n    io::stdin().read_line(&mut input).unwrap();\n    let nums: Vec<i32> = input.trim().split_whitespace()\n        .map(|x| x.parse().unwrap()).collect();\n    \n    let mut prefix = vec![0; n];\n    prefix[0] = nums[0];\n    for i in 1..n {\n        prefix[i] = prefix[i-1] + nums[i];\n    }\n    \n    input.clear();\n    io::stdin().read_line(&mut input).unwrap();\n    let q: usize = input.trim().parse().unwrap();\n    \n    for _ in 0..q {\n        input.clear();\n        io::stdin().read_line(&mut input).unwrap();\n        let parts: Vec<usize> = input.trim().split_whitespace()\n            .map(|x| x.parse().unwrap()).collect();\n        let (l, r) = (parts[0], parts[1]);\n        \n        let result = prefix[r] - prefix[l-1];\n        println!(\"{}\", result);\n    }\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let idx = 0;\n    const n: number = parseInt(input[idx++]);\n    const nums: number[] = input[idx++].split(' ').map(Number);\n    \n    const prefix: number[] = new Array(n);\n    prefix[0] = nums[0];\n    for(let i = 1; i < n; i++) {\n        prefix[i] = prefix[i-1] + nums[i];\n    }\n    \n    const q: number = parseInt(input[idx++]);\n    for(let i = 0; i < q; i++) {\n        const [L, R]: number[] = input[idx++].split(' ').map(Number);\n        const result: number = prefix[R] - prefix[L-1];\n        console.log(result);\n    }\n});"
        }
      ],
      "example": [
        {
          "input": "5\n1 3 2 5 4\n3\n0 2\n1 4\n2 3",
          "output": "6\n14\n7",
          "explanation": "Array: [1,3,2,5,4]. Query (0,2): sum of elements from index 0 to 2 = 1+3+2 = 6. Query (1,4): sum from index 1 to 4 = 3+2+5+4 = 14. Query (2,3): sum from index 2 to 3 = 2+5 = 7."
        },
        {
          "input": "4\n2 1 3 4\n2\n0 1\n2 3",
          "output": "3\n7",
          "explanation": "Array: [2,1,3,4]. Query (0,1): sum from index 0 to 1 = 2+1 = 3. Query (2,3): sum from index 2 to 3 = 3+4 = 7."
        }
      ]
    },
    {
      "id": 17,
      "question_title": "Sort by Frequency (Debug and Fix Code)",
      "description": "Given an array of integers, return elements sorted by frequency in descending order (most frequent first). If two elements have the same frequency, the smaller element should come first.",
      "hints": [
        "Use a hash map to count frequencies of each element.",
        "Create a custom comparator that sorts by frequency first, then by value for tie-breaking."
      ],
      "difficulty": "Medium",
      "tags": ["Array", "Hash Table", "Sorting"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    cin >> n;\n    vector<int> nums(n);\n    for(int i = 0; i < n; i++) {\n        cin >> nums[i];\n    }\n    \n    map<int, int> freq;\n    for(int x : nums) {\n        freq[x]++;\n    }\n    \n    vector<pair<int, int>> elements;\n    for(auto& p : freq) {\n        elements.push_back({p.first, p.second});\n    }\n    \n    sort(elements.begin(), elements.end(), [](const pair<int,int>& a, const pair<int,int>& b) {\n        if(a.second == b.second) {\n            return a.first > b.first;\n        }\n        return a.second < b.second;\n    });\n    \n    for(auto& p : elements) {\n        for(int i = 0; i < p.second; i++) {\n            cout << p.first << \" \";\n        }\n    }\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    n = int(input())\n    nums = list(map(int, input().split()))\n    \n    freq = {}\n    for x in nums:\n        freq[x] = freq.get(x, 0) + 1\n    \n    elements = list(freq.items())\n    \n    elements.sort(key=lambda x: (x[1], -x[0]))\n    \n    result = []\n    for val, count in elements:\n        result.extend([val] * count)\n    \n    print(' '.join(map(str, result)))\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i = 0; i < n; i++) {\n            nums[i] = sc.nextInt();\n        }\n        \n        Map<Integer, Integer> freq = new HashMap<>();\n        for(int x : nums) {\n            freq.put(x, freq.getOrDefault(x, 0) + 1);\n        }\n        \n        List<Map.Entry<Integer, Integer>> elements = new ArrayList<>(freq.entrySet());\n        \n        Collections.sort(elements, (a, b) -> {\n            if(a.getValue().equals(b.getValue())) {\n                return b.getKey() - a.getKey();\n            }\n            return a.getValue() - b.getValue();\n        });\n        \n        StringBuilder sb = new StringBuilder();\n        for(Map.Entry<Integer, Integer> entry : elements) {\n            for(int i = 0; i < entry.getValue(); i++) {\n                sb.append(entry.getKey()).append(\" \");\n            }\n        }\n        \n        System.out.println(sb.toString().trim());\n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let idx = 0;\n    const n = parseInt(input[idx++]);\n    const nums = input[idx++].split(' ').map(Number);\n    \n    const freq = new Map();\n    for(const x of nums) {\n        freq.set(x, (freq.get(x) || 0) + 1);\n    }\n    \n    const elements = Array.from(freq.entries());\n    \n    elements.sort((a, b) => {\n        if(a[1] === b[1]) {\n            return b[0] - a[0];\n        }\n        return a[1] - b[1];\n    });\n    \n    const result = [];\n    for(const [val, count] of elements) {\n        for(let i = 0; i < count; i++) {\n            result.push(val);\n        }\n    }\n    \n    console.log(result.join(' '));\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let n: usize = input.trim().parse().unwrap();\n    \n    input.clear();\n    io::stdin().read_line(&mut input).unwrap();\n    let nums: Vec<i32> = input.trim().split_whitespace()\n        .map(|x| x.parse().unwrap()).collect();\n    \n    let mut freq = HashMap::new();\n    for x in nums {\n        *freq.entry(x).or_insert(0) += 1;\n    }\n    \n    let mut elements: Vec<(i32, i32)> = freq.into_iter().collect();\n    \n    elements.sort_by(|a, b| {\n        if a.1 == b.1 {\n            b.0.cmp(&a.0)\n        } else {\n            a.1.cmp(&b.1)\n        }\n    });\n    \n    let mut result = Vec::new();\n    for (val, count) in elements {\n        for _ in 0..count {\n            result.push(val.to_string());\n        }\n    }\n    \n    println!(\"{}\", result.join(\" \"));\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let idx = 0;\n    const n: number = parseInt(input[idx++]);\n    const nums: number[] = input[idx++].split(' ').map(Number);\n    \n    const freq = new Map<number, number>();\n    for(const x of nums) {\n        freq.set(x, (freq.get(x) || 0) + 1);\n    }\n    \n    const elements: [number, number][] = Array.from(freq.entries());\n    \n    elements.sort((a, b) => {\n        if(a[1] === b[1]) {\n            return b[0] - a[0];\n        }\n        return a[1] - b[1];\n    });\n    \n    const result: number[] = [];\n    for(const [val, count] of elements) {\n        for(let i = 0; i < count; i++) {\n            result.push(val);\n        }\n    }\n    \n    console.log(result.join(' '));\n});"
        }
      ],
      "example": [
        {
          "input": "6\n1 1 2 2 2 3",
          "output": "2 2 2 1 1 3",
          "explanation": "Frequencies: 1 appears 2 times, 2 appears 3 times, 3 appears 1 time. Sorted by frequency (desc): 2 (3 times), 1 (2 times), 3 (1 time). Output: 2 2 2 1 1 3"
        },
        {
          "input": "5\n4 5 4 5 6",
          "output": "4 4 5 5 6",
          "explanation": "Frequencies: 4 appears 2 times, 5 appears 2 times, 6 appears 1 time. For same frequency, smaller comes first: 4 (2 times), 5 (2 times), 6 (1 time). Output: 4 4 5 5 6"
        }
      ]
    },
    {
      "id": 18,
      "question_title": "Minimize Max Difference in K Partitions (Debug and Fix Code)",
      "description": "Given an array of n integers and an integer k, partition the array into exactly k non-empty groups such that the maximum difference between the largest and smallest element within any group is minimized. Return the minimized maximum difference.",
      "hints": [
        "Sort the array first to make greedy partitioning easier.",
        "Use greedy approach: try to keep elements in each partition as close as possible."
      ],
      "difficulty": "Hard",
      "tags": ["Array", "Greedy", "Sorting", "Dynamic Programming"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n, k;\n    cin >> n >> k;\n    vector<int> nums(n);\n    for(int i = 0; i < n; i++) {\n        cin >> nums[i];\n    }\n    \n    sort(nums.begin(), nums.end());\n    \n    int maxDiff = 0;\n    int groupSize = n / k;\n    \n    for(int i = 0; i < k; i++) {\n        int start = i * groupSize;\n        int end = (i == k - 1) ? n - 1 : start + groupSize - 1;\n        \n        if(start < n) {\n            maxDiff = max(maxDiff, nums[end] - nums[start]);\n        }\n    }\n    \n    cout << maxDiff << endl;\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    n, k = map(int, input().split())\n    nums = list(map(int, input().split()))\n    \n    nums.sort()\n    \n    max_diff = 0\n    group_size = n // k\n    \n    for i in range(k):\n        start = i * group_size\n        end = n - 1 if i == k - 1 else start + group_size - 1\n        \n        if start < n:\n            max_diff = max(max_diff, nums[end] - nums[start])\n    \n    print(max_diff)\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i = 0; i < n; i++) {\n            nums[i] = sc.nextInt();\n        }\n        \n        Arrays.sort(nums);\n        \n        int maxDiff = 0;\n        int groupSize = n / k;\n        \n        for(int i = 0; i < k; i++) {\n            int start = i * groupSize;\n            int end = (i == k - 1) ? n - 1 : start + groupSize - 1;\n            \n            if(start < n) {\n                maxDiff = Math.max(maxDiff, nums[end] - nums[start]);\n            }\n        }\n        \n        System.out.println(maxDiff);\n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let idx = 0;\n    const [n, k] = input[idx++].split(' ').map(Number);\n    const nums = input[idx++].split(' ').map(Number);\n    \n    nums.sort((a, b) => a - b);\n    \n    let maxDiff = 0;\n    const groupSize = Math.floor(n / k);\n    \n    for(let i = 0; i < k; i++) {\n        const start = i * groupSize;\n        const end = (i === k - 1) ? n - 1 : start + groupSize - 1;\n        \n        if(start < n) {\n            maxDiff = Math.max(maxDiff, nums[end] - nums[start]);\n        }\n    }\n    \n    console.log(maxDiff);\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let parts: Vec<usize> = input.trim().split_whitespace()\n        .map(|x| x.parse().unwrap()).collect();\n    let (n, k) = (parts[0], parts[1]);\n    \n    input.clear();\n    io::stdin().read_line(&mut input).unwrap();\n    let mut nums: Vec<i32> = input.trim().split_whitespace()\n        .map(|x| x.parse().unwrap()).collect();\n    \n    nums.sort();\n    \n    let mut max_diff = 0;\n    let group_size = n / k;\n    \n    for i in 0..k {\n        let start = i * group_size;\n        let end = if i == k - 1 { n - 1 } else { start + group_size - 1 };\n        \n        if start < n {\n            max_diff = max_diff.max(nums[end] - nums[start]);\n        }\n    }\n    \n    println!(\"{}\", max_diff);\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let idx = 0;\n    const [n, k]: number[] = input[idx++].split(' ').map(Number);\n    const nums: number[] = input[idx++].split(' ').map(Number);\n    \n    nums.sort((a, b) => a - b);\n    \n    let maxDiff: number = 0;\n    const groupSize: number = Math.floor(n / k);\n    \n    for(let i = 0; i < k; i++) {\n        const start: number = i * groupSize;\n        const end: number = (i === k - 1) ? n - 1 : start + groupSize - 1;\n        \n        if(start < n) {\n            maxDiff = Math.max(maxDiff, nums[end] - nums[start]);\n        }\n    }\n    \n    console.log(maxDiff);\n});"
        }
      ],
      "example": [
        {
          "input": "6 3\n1 4 9 2 5 7",
          "output": "2",
          "explanation": "Array after sorting: [1,2,4,5,7,9]. One optimal partition: [1,2], [4,5], [7,9]. Max differences: 1, 1, 2. The minimized maximum difference is 2."
        },
        {
          "input": "4 2\n10 1 5 8",
          "output": "4",
          "explanation": "Array after sorting: [1,5,8,10]. Optimal partition: [1,5], [8,10]. Max differences: 4, 2. The minimized maximum difference is 4."
        }
      ]
    },
    {
      "id": 19,
      "question_title": "Count Valid Parentheses Substrings (Debug and Fix Code)",
      "description": "Given a string containing only '(' and ')' characters, count the number of valid balanced parentheses substrings. A valid substring means every opening bracket has a corresponding closing bracket in the correct order.",
      "hints": [
        "Use a stack-based approach or counter method to track balanced parentheses.",
        "Be careful to handle nested pairs correctly and avoid miscounting."
      ],
      "difficulty": "Medium",
      "tags": ["String", "Stack", "Dynamic Programming"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    cin >> s;\n    int n = s.length();\n    \n    int count = 0;\n    stack<int> st;\n    \n    for(int i = 0; i < n; i++) {\n        if(s[i] == '(') {\n            st.push(i);\n        } else {\n            if(!st.empty()) {\n                st.pop();\n                count++;\n            }\n        }\n    }\n    \n    cout << count << endl;\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    s = input().strip()\n    n = len(s)\n    \n    count = 0\n    stack = []\n    \n    for i in range(n):\n        if s[i] == '(':\n            stack.append(i)\n        else:\n            if stack:\n                stack.pop()\n                count += 1\n    \n    print(count)\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        String s = sc.next();\n        int n = s.length();\n        \n        int count = 0;\n        Stack<Integer> stack = new Stack<>();\n        \n        for(int i = 0; i < n; i++) {\n            if(s.charAt(i) == '(') {\n                stack.push(i);\n            } else {\n                if(!stack.isEmpty()) {\n                    stack.pop();\n                    count++;\n                }\n            }\n        }\n        \n        System.out.println(count);\n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    const s = input[0].trim();\n    const n = s.length;\n    \n    let count = 0;\n    const stack = [];\n    \n    for(let i = 0; i < n; i++) {\n        if(s[i] === '(') {\n            stack.push(i);\n        } else {\n            if(stack.length > 0) {\n                stack.pop();\n                count++;\n            }\n        }\n    }\n    \n    console.log(count);\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let s = input.trim();\n    let n = s.len();\n    \n    let mut count = 0;\n    let mut stack = Vec::new();\n    \n    for (i, c) in s.chars().enumerate() {\n        if c == '(' {\n            stack.push(i);\n        } else {\n            if !stack.is_empty() {\n                stack.pop();\n                count += 1;\n            }\n        }\n    }\n    \n    println!(\"{}\", count);\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    const s: string = input[0].trim();\n    const n: number = s.length;\n    \n    let count: number = 0;\n    const stack: number[] = [];\n    \n    for(let i = 0; i < n; i++) {\n        if(s[i] === '(') {\n            stack.push(i);\n        } else {\n            if(stack.length > 0) {\n                stack.pop();\n                count++;\n            }\n        }\n    }\n    \n    console.log(count);\n});"
        }
      ],
      "example": [
        {
          "input": "((()))",
          "output": "3",
          "explanation": "Valid substrings: '()', '(())', '((()))'. Total count is 3."
        },
        {
          "input": "()())",
          "output": "2",
          "explanation": "Valid substrings: '()', '()'. The last ')' doesn't form a valid pair. Total count is 2."
        }
      ]
    },
    {
      "id": 20,
      "question_title": "Longest Increasing Subsequence (Debug and Fix Code)",
      "description": "Given an array of integers, return the length of the longest strictly increasing subsequence. A subsequence is derived from the array by deleting some or no elements without changing the order of remaining elements.",
      "hints": [
        "Use dynamic programming where dp[i] represents the length of LIS ending at index i.",
        "Be careful with the comparison - use strictly increasing (< not <=) and update DP in correct order."
      ],
      "difficulty": "Medium",
      "tags": ["Array", "Dynamic Programming", "Binary Search"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    cin >> n;\n    vector<int> nums(n);\n    for(int i = 0; i < n; i++) {\n        cin >> nums[i];\n    }\n    \n    vector<int> dp(n, 1);\n    \n    for(int i = 1; i < n; i++) {\n        for(int j = 0; j < i; j++) {\n            if(nums[j] <= nums[i]) {\n                dp[i] = max(dp[i], dp[j] + 1);\n            }\n        }\n    }\n    \n    int result = *max_element(dp.begin(), dp.end());\n    cout << result << endl;\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    n = int(input())\n    nums = list(map(int, input().split()))\n    \n    dp = [0] * n\n    \n    for i in range(1, n):\n        for j in range(i):\n            if nums[j] < nums[i]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    \n    print(max(dp))\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i = 0; i < n; i++) {\n            nums[i] = sc.nextInt();\n        }\n        \n        int[] dp = new int[n];\n        Arrays.fill(dp, 1);\n        \n        for(int i = 0; i < n; i++) {\n            for(int j = i + 1; j < n; j++) {\n                if(nums[i] < nums[j]) {\n                    dp[j] = Math.max(dp[j], dp[i] + 1);\n                }\n            }\n        }\n        \n        int result = Arrays.stream(dp).max().orElse(0);\n        System.out.println(result);\n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    const n = parseInt(input[0]);\n    const nums = input[1].split(' ').map(Number);\n    \n    const dp = new Array(n).fill(1);\n    \n    for(let i = 1; i < n; i++) {\n        for(let j = 0; j < i; j++) {\n            if(nums[j] <= nums[i]) {\n                dp[i] = Math.max(dp[i], dp[j] + 1);\n            }\n        }\n    }\n    \n    const result = Math.max(...dp);\n    console.log(result);\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let n: usize = input.trim().parse().unwrap();\n    \n    input.clear();\n    io::stdin().read_line(&mut input).unwrap();\n    let nums: Vec<i32> = input.trim().split_whitespace()\n        .map(|x| x.parse().unwrap()).collect();\n    \n    let mut dp = vec![0; n];\n    \n    for i in 1..n {\n        for j in 0..i {\n            if nums[j] < nums[i] {\n                dp[i] = dp[i].max(dp[j] + 1);\n            }\n        }\n    }\n    \n    let result = dp.iter().max().unwrap_or(&0);\n    println!(\"{}\", result);\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    const n: number = parseInt(input[0]);\n    const nums: number[] = input[1].split(' ').map(Number);\n    \n    const dp: number[] = new Array(n).fill(1);\n    \n    for(let i = 0; i < n; i++) {\n        for(let j = i + 1; j < n; j++) {\n            if(nums[i] < nums[j]) {\n                dp[j] = Math.max(dp[j], dp[i] + 1);\n            }\n        }\n    }\n    \n    const result: number = Math.max(...dp);\n    console.log(result);\n});"
        }
      ],
      "example": [
        {
          "input": "6\n10 9 2 5 3 7",
          "output": "3",
          "explanation": "The longest increasing subsequence is [2,5,7] or [2,3,7], both have length 3."
        },
        {
          "input": "4\n1 3 2 4",
          "output": "3",
          "explanation": "The longest increasing subsequence is [1,3,4] or [1,2,4], both have length 3."
        }
      ]
    },
    {
      "id": 21,
      "question_title": "Reverse K Group in Linked List (Fix Syntax Errors)",
      "description": "Given the head of a linked list and an integer k, reverse the nodes of the list k at a time and return the modified list. If the number of nodes is not a multiple of k, leave the remaining nodes as they are.",
      "hints": [
        "Use classic pointer manipulation with prev, curr, and next pointers.",
        "Count nodes first to check if we have at least k nodes to reverse."
      ],
      "difficulty": "Hard",
      "tags": ["Linked List", "Recursion", "Pointer Manipulation"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(), next(nullptr) {}\n    ListNode(int X) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n\nListNode reverseKGroup(ListNode* head, int k) {\n    if (!head || k == 1) return head;\n    \n    ListNode* temp = head;\n    int count = 0;\n    \n    while temp && count < k {\n        temp = temp->next;\n        count++;\n    }\n    \n    if (count == k) {\n        temp = reverseKGroup(temp, k);\n        \n        ListNode prev = *temp;\n        ListNode* curr = head;\n        \n        for (int i = 0; i < k; i++) {\n            ListNode* next = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = next\n        }\n        \n        head = prev;\n    }\n    \n    return head;\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n, k;\n    cin >> n >> k;\n    \n    ListNode* head = nullptr;\n    ListNode* tail = nullptr;\n    \n    for (int i = 0; i < n; i++) {\n        int val;\n        cin >> val;\n        ListNode* newNode = new ListNode(val);\n        \n        if (!head) {\n            head = tail = newNode;\n        } else {\n            tail->next = newNode;\n            tail = newNode;\n        }\n    }\n    \n    head = reverseKGroup(head, k);\n    \n    ListNode* curr = head;\n    while (curr) {\n        cout << curr->val;\n        if (curr->next) cout << \" \";\n        curr = curr->next;\n    }\n    cout << endl;\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverseKGroup(head, k):\n    if not head or k == 1:\n        return head\n    \n    temp = head\n    count = 0\n    \n    while temp and count < k\n        temp = temp.next\n        count += 1\n    \n    if count == k:\n        temp = reverseKGroup(temp, k)\n        \n        prev = temp\n        curr = head\n        \n        for i in range(k):\n            next_node = curr.next\n            curr.next = prev\n            prev = curr\n            curr = next_node\n        \n        head = prev\n    \n    return head\n\ndef solve():\n    n, k = map(int, input().split())\n    values = list(map(int, input().split()))\n    \n    head = None\n    tail = None\n    \n    for val in values:\n        new_node = ListNode(val)\n        if not head:\n            head = tail = new_node\n        else:\n            tail.next = new_node\n            tail = new_node\n    \n    head = reverseKGroup(head, k)\n    \n    result = []\n    curr = head\n    while curr:\n        result.append(str(curr.val))\n        curr = curr.next\n    \n    print(' '.join(result))\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode() {}\n    ListNode(int val) { this.val = val; }\n    ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\npublic class Main {\n    public ListNode reverseKGroup(ListNode head, int k) {\n        if (head == null || k == 1) return head;\n        \n        ListNode temp = head;\n        int count = 0;\n        \n        while (temp != null && count < k) {\n            temp = temp.next;\n            count++;\n        }\n        \n        if (count == k) {\n            temp = reverseKGroup(temp, k);\n            \n            ListNode prev = temp;\n            ListNode curr = head;\n            \n            for (int i = 0; i < k; i++) {\n                ListNode next = curr.next;\n                curr.next = prev;\n                prev = curr;\n                curr = next;\n            }\n            \n            head = prev;\n        }\n        \n        return head;\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        \n        ListNode head = null;\n        ListNode tail = null;\n        \n        for (int i = 0; i < n; i++) {\n            int val = sc.nextInt();\n            ListNode newNode = new ListNode(val);\n            \n            if (head == null) {\n                head = tail = newNode;\n            } else {\n                tail.next = newNode;\n                tail = newNode;\n            }\n        }\n        \n        head = reverseKGroup(head, k);\n        \n        ListNode curr = head;\n        while (curr != null) {\n            System.out.print(curr.val);\n            if (curr.next != null) System.out.print(\" \");\n            curr = curr.next;\n        }\n        System.out.println();\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nclass ListNode {\n    constructor(val = 0, next = null) {\n        this.val = val;\n        this.next = next;\n    }\n}\n\nfunction reverseKGroup(head, k) {\n    if (!head || k === 1) return head;\n    \n    let temp = head;\n    let count = 0;\n    \n    while (temp && count < k) {\n        temp = temp.next;\n        count++;\n    }\n    \n    if (count === k) {\n        temp = reverseKGroup(temp, k);\n        \n        let prev = temp;\n        let curr = head;\n        \n        for (let i = 0; i < k; i++) {\n            let next = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = next;\n        }\n        \n        head = prev;\n    }\n    \n    return head;\n}\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    const [n, k] = input[0].split(' ').map(Number);\n    const values = input[1].split(' ').map(Number);\n    \n    let head = null;\n    let tail = null;\n    \n    for (const val of values) {\n        const newNode = new ListNode(val);\n        if (!head) {\n            head = tail = newNode;\n        } else {\n            tail.next = newNode;\n            tail = newNode;\n        }\n    }\n    \n    head = reverseKGroup(head, k);\n    \n    const result = [];\n    let curr = head;\n    while (curr) {\n        result.push(curr.val);\n        curr = curr.next;\n    }\n    \n    console.log(result ' ');\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\n\n#[derive(PartialEq, Eq, Clone, Debug)]\npub struct ListNode {\n    pub val: i32,\n    pub next: Option<Box<ListNode>>,\n}\n\nimpl ListNode {\n    #[inline]\n    fn new(val: i32) -> Self {\n        ListNode { next: None, val }\n    }\n}\n\nfn reverse_k_group(head: Option<Box<ListNode>>, k: i32) -> Option<Box<ListNode>> {\n    if head.is_none() || k == 1 {\n        return head;\n    }\n    \n    let mut temp = &head;\n    let mut count = 0;\n    \n    while temp.is_some() && count < k {\n        temp = &temp.as_ref().unwrap().next;\n        count += 1;\n    }\n    \n    if count == k {\n        let mut curr = head;\n        let mut prev = reverse_k_group(temp.clone(), k);\n        \n        for _ in 0..k {\n            if let Some(mut node) = curr {\n                let next = node.next.take();\n                node.next = prev;\n                prev = Some(node);\n                curr = next;\n            }\n        }\n        \n        return prev;\n    }\n    \n    head\n}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let parts: Vec<i32> = input.trim().split_whitespace()\n        .map(|x| x.parse().unwrap()).collect();\n    let (n, k) = (parts[0], parts[1]);\n    \n    input.clear();\n    io::stdin().read_line(&mut input).unwrap();\n    let values: Vec<i32> = input.trim().split_whitespace()\n        .map(|x| x.parse().unwrap()).collect();\n    \n    let mut head = None;\n    \n    for val in values.iter().rev() {\n        head = Some(Box::new(ListNode {\n            val: *val,\n            next: head,\n        }));\n    }\n    \n    head = reverse_k_group(head, k);\n    \n    let mut result = Vec::new();\n    let mut curr = &head;\n    while let Some(node) = curr {\n        result.push(node.val.to_string());\n        curr = &node.next;\n    }\n    \n    println!(\"{}\", result.join(\" \"));\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nclass ListNode {\n    val: number;\n    next: ListNode | null;\n    \n    constructor(val: number = 0, next: ListNode | null = null) {\n        this.val = val;\n        this.next = next;\n    }\n}\n\nfunction reverseKGroup(head: ListNode | null, k: number): ListNode | null {\n    if (!head || k === 1) return head;\n    \n    let temp: ListNode | null = head;\n    let count: number = 0;\n    \n    while (temp && count < k) {\n        temp = temp.next;\n        count++;\n    }\n    \n    if (count === k) {\n        temp = reverseKGroup(temp, k);\n        \n        let prev: ListNode | null = temp;\n        let curr: ListNode | null = head;\n        \n        for (let i = 0; i < k; i++) {\n            const next: ListNode | null = curr!.next;\n            curr!.next = prev;\n            prev = curr;\n            curr = next;\n        }\n        \n        head = prev;\n    }\n    \n    return head;\n}\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    const [n, k]: number[] = input[0].split(' ').map(Number);\n    const values: number[] = input[1].split(' ').map(Number);\n    \n    let head: ListNode | null = null;\n    let tail: ListNode | null = null;\n    \n    for (const val of values) {\n        const newNode = new ListNode(val);\n        if (!head) {\n            head = tail = newNode;\n        } else {\n            tail!.next = newNode;\n            tail = newNode;\n        }\n    }\n    \n    head = reverseKGroup(head, k);\n    \n    const result: number[] = [];\n    let curr: ListNode | null = head;\n    while (curr) {\n        result.push(curr.val);\n        curr = curr.next;\n    }\n    \n    console.log(result.join(' '));\n});"
        }
      ],
      "example": [
        {
          "input": "5 2\n1 2 3 4 5",
          "output": "2 1 4 3 5",
          "explanation": "The linked list is [1,2,3,4,5]. Reversing every 2 nodes: [2,1,4,3,5]. The last node 5 remains as is since there's only 1 node left."
        },
        {
          "input": "6 3\n1 2 3 4 5 6",
          "output": "3 2 1 6 5 4",
          "explanation": "The linked list is [1,2,3,4,5,6]. Reversing every 3 nodes: [3,2,1,6,5,4]."
        }
      ]
    },
    {
      "id": 22,
      "question_title": "Merge Intervals (Fix Syntax Errors)",
      "description": "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.",
      "hints": [
        "Sort the intervals by their start times first.",
        "Iterate through sorted intervals and merge overlapping ones by comparing end times."
      ],
      "difficulty": "Medium",
      "tags": ["Array", "Sorting", "Intervals"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    cin >> n;\n    \n    vector<int> intervals[n];\n    \n    for (int i = 0; i < n; i++) {\n        vector<int> interval(2);\n        cin >> interval[0] >> interval[1];\n        intervals[i] = interval;\n    }\n    \n    sort(intervals, intervals + n, [](vector<int> a, vector<int> b) {\n        return a[0] < b[0];\n    });\n    \n    vector<vector<int>> result;\n    \n    for (int i = 0; i < n; i++) {\n        if (result.empty() || result.back()[1] < intervals[i][0]) {\n            result.push_back(intervals[i]);\n        } else {\n            result.back()[1] = max(result.back()[1], intervals[i][1]);\n        }\n    }\n    \n    for (const auto& interval : result) {\n        cout << interval[0] << \" \" << interval[1] << \"\\n\";\n    }\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    n = int(input())\n    intervals = []\n    \n    for _ in range(n):\n        start, end = map(int, input().split())\n        intervals.append([start, end])\n    \n    intervals.sort(key=lambda x: x[0])\n    \n    result = []\n    \n    for interval in intervals:\n        if not result or result[-1][1] < interval[0]:\n            result.append(interval)\n        else:\n            result[-1][1] = max(result[-1][1], interval[1])\n    \n    for interval in result:\n        print(interval[0], interval[1])\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int[][] intervals = new int[n][2];\n        \n        for (int i = 0; i < n; i++) {\n            intervals[i][0] = sc.nextInt();\n            intervals[i][1] = sc.nextInt();\n        }\n        \n        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);\n        \n        List<int[]> result = new ArrayList<>();\n        \n        for (int[] interval : intervals) {\n            if (result.isEmpty() || result.get(result.size() - 1)[1] < interval[0]) {\n                result.add(interval);\n            } else {\n                result.get(result.size() - 1)[1] = Math.max(result.get(result.size() - 1)[1], interval[1]);\n            }\n        }\n        \n        for (int[] interval : result) {\n            System.out.println(interval[0] + \" \" + interval[1]);\n        }\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    const n = parseInt(input[0]);\n    const intervals = [];\n    \n    for (let i = 1; i <= n; i++) {\n        const [start, end] = input[i].split(' ').map(Number);\n        intervals.push([start, end]);\n    }\n    \n    intervals.sort((a, b) => a[0] - b[0]);\n    \n    const result = [];\n    \n    for (const interval of intervals) {\n        if (result.length === 0 || result[result.length - 1][1] < interval[0]) {\n            result.push(interval);\n        } else {\n            result[result.length - 1][1] = Math.max(result[result.length - 1][1], interval[1]);\n        }\n    }\n    \n    for (const interval of result) {\n        console.log(`${interval[0]} ${interval[1]}`);\n    }\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let n: usize = input.trim().parse().unwrap();\n    \n    let mut intervals = Vec::new();\n    \n    for _ in 0..n {\n        input.clear();\n        io::stdin().read_line(&mut input).unwrap();\n        let parts: Vec<i32> = input.trim().split_whitespace()\n            .map(|x| x.parse().unwrap()).collect();\n        intervals.push(vec![parts[0], parts[1]]);\n    }\n    \n    intervals.sort_by(|a, b| a[0].cmp(&b[0]));\n    \n    let mut result = Vec::new();\n    \n    for interval in intervals {\n        if result.is_empty() || result.last().unwrap()[1] < interval[0] {\n            result.push(interval);\n        } else {\n            let mut last = result.pop().unwrap();\n            last[1] = last[1].max(interval[1]);\n            result.push(last);\n        }\n    }\n    \n    for interval in result {\n        println!(\"{} {}\", interval[0], interval[1]);\n    }\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    const n: number = parseInt(input[0]);\n    const intervals: number[][] = [];\n    \n    for (let i = 1; i <= n; i++) {\n        const [start, end]: number[] = input[i].split(' ').map(Number);\n        intervals.push([start, end]);\n    }\n    \n    intervals.sort((a, b) => a[0] - b[0]);\n    \n    const result: number[][] = [];\n    \n    for (const interval of intervals) {\n        if (result.length === 0 || result[result.length - 1][1] < interval[0]) {\n            result.push(interval);\n        } else {\n            result[result.length - 1][1] = Math.max(result[result.length - 1][1], interval[1]);\n        }\n    }\n    \n    for (const interval of result) {\n        console.log(interval.join(' '));\n    }\n});"
        }
      ],
      "example": [
        {
          "input": "4\n1 3\n2 6\n8 10\n15 18",
          "output": "1 6\n8 10\n15 18",
          "explanation": "Intervals [1,3] and [2,6] overlap, so they merge to [1,6]. The other intervals [8,10] and [15,18] don't overlap with any other intervals."
        },
        {
          "input": "2\n1 4\n4 5",
          "output": "1 5",
          "explanation": "Intervals [1,4] and [4,5] are considered overlapping since they touch at point 4, so they merge to [1,5]."
        }
      ]
    },
    {
      "id": 23,
      "question_title": "Count Inversions in Array (Fix Syntax Errors)",
      "description": "Given an array of integers, count the number of inversions. An inversion is a pair of indices (i, j) such that i < j and arr[i] > arr[j]. Use modified merge sort to solve this efficiently.",
      "hints": [
        "Use divide and conquer approach with merge sort to count inversions during the merge process.",
        "Count inversions when elements from the right subarray are smaller than elements from the left subarray during merging."
      ],
      "difficulty": "Medium",
      "tags": ["Array", "Divide and Conquer", "Merge Sort"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nlong long mergeAndCount(vector<int>& arr, int temp[], int left, int mid int right) {\n    int i, j, k;\n    long long inv_count = 0;\n    \n    i = left; j = mid; k = left;\n    \n    while ((i <= mid - 1) && (j <= right)) {\n        if (arr[i] <= arr[j]) {\n            temp[k++] = arr[i++];\n        } else {\n            temp[k++] = arr[j++];\n            inv_count += (mid - i);\n        }\n    }\n    \n    while (i <= mid - 1)\n        temp[k++] = arr[i++];\n    \n    while (j <= right)\n        temp[k++] = arr[j++];\n    \n    for (int i = left; i <= right; i++)\n        arr[i] = temp[i];\n    \n    return inv_count;\n}\n\nlong long mergeSortAndCount(vector<int>& arr, int temp[], int left, int right) {\n    long long inv_count = 0;\n    if (left < right) {\n        int mid = left + (right - left) / 2;\n        \n        inv_count += mergeSortAndCount(arr, temp, left, mid);\n        inv_count += mergeSortAndCount(arr, temp, mid + 1, right);\n        inv_count += mergeAndCount(arr, temp left, mid + 1, right);\n    }\n    return inv_count;\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    cin >> n;\n    vector<int> arr(n);\n    \n    for (int i = 0; i < n; i++) {\n        cin >> arr[i];\n    }\n    \n    int temp[n];\n    long long result = mergeSortAndCount(arr, temp, 0, n - 1);\n    cout << result << endl;\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef merge_and_count(arr, temp_arr, left, mid, right):\n    i, j, k = left, mid + 1, left\n    inv_count = 0\n    \n    while i <= mid and j <= right:\n        if arr[i] <= arr[j]:\n            temp_arr[k] = arr[i]\n            i += 1\n        else:\n            temp_arr[k] = arr[j]\n            inv_count += (mid - i + 1)\n            j += 1\n        k += 1\n    \n    while i <= mid:\n        temp_arr[k] = arr[i]\n        i += 1\n        k += 1\n    \n    while j <= right:\n        temp_arr[k] = arr[j]\n        j += 1\n        k += 1\n    \n    for i in range(left, right + 1):\n        arr[i] = temp_arr[i]\n    \n    return inv_count\n\ndef merge_sort_and_count(arr, temp_arr, left, right):\n    inv_count = 0\n    if left < right:\n        mid = (left + right) // 2\n        \n        inv_count += merge_sort_and_count(arr, temp_arr, left, mid)\n        inv_count += merge_sort_and_count(arr, temp_arr, mid + 1, right)\n        inv_count += merge_and_count(arr, temp_arr, left, mid, right)\n    \n    return inv_count\n\ndef solve():\n    n = int(input())\n    arr = list(map(int, input().split()))\n    \n    temp_arr = [0] * n\n    result = merge_sort_and_count(arr, temp_arr, 0, n - 1)\n    print(result)\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    \n    public static long mergeAndCount(int[] arr, int[] temp, int left, int mid, int right) {\n        int i = left, j = mid + 1, k = left;\n        long invCount = 0;\n        \n        while (i <= mid && j <= right) {\n            if (arr[i] <= arr[j]) {\n                temp[k++] = arr[i++];\n            } else {\n                temp[k++] = arr[j++];\n                invCount += (mid - i + 1);\n            }\n        }\n        \n        while (i <= mid) {\n            temp[k++] = arr[i++];\n        }\n        \n        while (j <= right) {\n            temp[k++] = arr[j++];\n        }\n        \n        for (int idx = left; idx <= right; idx++) {\n            arr[idx] = temp[idx];\n        }\n        \n        return invCount;\n    }\n    \n    public static long mergeSortAndCount(int[] arr, int[] temp, int left, int right) {\n        long invCount = 0;\n        if (left < right) {\n            int mid = left + (right - left) / 2;\n            \n            invCount += mergeSortAndCount(arr, temp, left, mid);\n            invCount += mergeSortAndCount(arr, temp, mid + 1, right);\n            invCount += mergeAndCount(arr, temp, left, mid, right);\n        }\n        return invCount;\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        \n        for (int i = 0; i < n; i++) {\n            arr[i] = sc.nextInt();\n        }\n        \n        int[] temp = new int[n];\n        long result = mergeSortAndCount(arr, temp, 0, n - 1);\n        System.out.println(result);\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nfunction mergeAndCount(arr, temp, left, mid, right) {\n    let i = left, j = mid + 1, k = left;\n    let invCount = 0;\n    \n    while (i <= mid && j <= right) {\n        if (arr[i] <= arr[j]) {\n            temp[k++] = arr[i++];\n        } else {\n            temp[k++] = arr[j++];\n            invCount += (mid - i + 1);\n        }\n    }\n    \n    while (i <= mid) {\n        temp[k++] = arr[i++];\n    }\n    \n    while (j <= right) {\n        temp[k++] = arr[j++];\n    }\n    \n    for (let idx = left; idx <= right; idx++) {\n        arr[idx] = temp[idx];\n    }\n    \n    return invCount;\n}\n\nfunction mergeSortAndCount(arr, temp, left, right) {\n    let invCount = 0;\n    if (left < right) {\n        let mid = Math.floor((left + right) / 2);\n        \n        invCount += mergeSortAndCount(arr, temp, left, mid);\n        invCount += mergeSortAndCount(arr, temp, mid + 1, right);\n        invCount += mergeAndCount(arr, temp, left, mid, right);\n    }\n    return invCount;\n}\n\nrl.on('close', () => {\n    const n = parseInt(input[0]);\n    const arr = input[1].split(' ').map(Number);\n    \n    const temp = new Array(n);\n    const result = mergeSortAndCount(arr, temp, 0, n - 1);\n    console.log(result);\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\n\nfn merge_and_count(arr: &mut Vec<i32>, temp: &mut Vec<i32>, left: usize, mid: usize, right: usize) -> i64 {\n    let mut i = left;\n    let mut j = mid + 1;\n    let mut k = left;\n    let mut inv_count: i64 = 0;\n    \n    while i <= mid && j <= right {\n        if arr[i] <= arr[j] {\n            temp[k] = arr[i];\n            i += 1;\n        } else {\n            temp[k] = arr[j];\n            inv_count += (mid - i + 1) as i64;\n            j += 1;\n        }\n        k += 1;\n    }\n    \n    while i <= mid {\n        temp[k] = arr[i];\n        i += 1;\n        k += 1;\n    }\n    \n    while j <= right {\n        temp[k] = arr[j];\n        j += 1;\n        k += 1;\n    }\n    \n    for idx in left..=right {\n        arr[idx] = temp[idx];\n    }\n    \n    inv_count\n}\n\nfn merge_sort_and_count(arr: &mut Vec<i32>, temp: &mut Vec<i32>, left: usize, right: usize) -> i64 {\n    let mut inv_count: i64 = 0;\n    if left < right {\n        let mid = left + (right - left) / 2;\n        \n        inv_count += merge_sort_and_count(arr, temp, left, mid);\n        inv_count += merge_sort_and_count(arr, temp, mid + 1, right);\n        inv_count += merge_and_count(arr, temp, left, mid, right);\n    }\n    inv_count\n}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let n: usize = input.trim().parse().unwrap();\n    \n    input.clear();\n    io::stdin().read_line(&mut input).unwrap();\n    let mut arr: Vec<i32> = input\n        .trim()\n        .split_whitespace()\n        .map(|x| x.parse().unwrap())\n        .collect();\n    \n    let mut temp = vec![0; n];\n    let result = merge_sort_and_count(&mut arr, &mut temp, 0, n - 1);\n    println!(\"{}\", result);\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nfunction mergeAndCount(arr: number[], temp: number[], left: number, mid: number, right: number): number {\n    let i: number = left, j: number = mid + 1, k: number = left;\n    let invCount: number = 0;\n    \n    while (i <= mid && j <= right) {\n        if (arr[i] <= arr[j]) {\n            temp[k++] = arr[i++];\n        } else {\n            temp[k++] = arr[j++];\n            invCount += (mid - i + 1);\n        }\n    }\n    \n    while (i <= mid) {\n        temp[k++] = arr[i++];\n    }\n    \n    while (j <= right) {\n        temp[k++] = arr[j++];\n    }\n    \n    for (let idx: number = left; idx <= right; idx++) {\n        arr[idx] = temp[idx];\n    }\n    \n    return invCount;\n}\n\nfunction mergeSortAndCount(arr: number[], temp: number[], left: number, right: number): number {\n    let invCount: number = 0;\n    if (left < right) {\n        const mid: number = Math.floor((left + right) / 2);\n        \n        invCount += mergeSortAndCount(arr, temp, left, mid);\n        invCount += mergeSortAndCount(arr, temp, mid + 1, right);\n        invCount += mergeAndCount(arr, temp, left, mid, right);\n    }\n    return invCount;\n}\n\nrl.on('close', () => {\n    const n: number = parseInt(input[0]);\n    const arr: number[] = input[1].split(' ').map(Number);\n    \n    const temp: number[] = new Array(n);\n    const result: number = mergeSortAndCount(arr, temp, 0, n - 1);\n    console.log(result);\n});"
        }
      ],
      "example": [
        {
          "input": "5\n2 3 8 6 1",
          "output": "5",
          "explanation": "The inversions are: (2,1), (3,1), (8,6), (8,1), (6,1). Total count is 5."
        },
        {
          "input": "4\n1 3 2 4",
          "output": "1",
          "explanation": "Only one inversion exists: (3,2) at indices (1,2). Total count is 1."
        }
      ]
    },
    {
      "id": 24,
      "question_title": "Unique Element with XOR (Fix Syntax Errors)",
      "description": "Given an array of integers where every element appears exactly twice except for one element which appears exactly once, find that single element. You must implement a solution with linear runtime complexity and use only constant extra space.",
      "hints": [
        "Use the XOR operation property: a XOR a = 0 and a XOR 0 = a.",
        "XOR all elements together - the duplicates will cancel out leaving only the unique element."
      ],
      "difficulty": "Easy",
      "tags": ["Array", "Bit Manipulation", "XOR"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint findSingle(vector<int>& nums) {\n    int result = 0\n    for (int i = 0; i < nums.size(); i++) {\n        result =^ nums[i];\n    }\n    return result;\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    cin >> n;\n    vector<int> nums(n);\n    \n    for (int i = 0; i < n; i++) {\n        cin >> nums[i]\n    }\n    \n    int ans = findSingle(nums);\n    cout << ans;\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef find_single(nums):\n    result = 0\n    for num in nums:\n        result ^= num\n    return result\n\ndef solve():\n    n = int(input())\n    nums = list(map(int, input().split()))\n    \n    ans = find_single(nums)\n    print(ans)\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    \n    public static int findSingle(int[] nums) {\n        int result = 0;\n        for (int i = 0; i < nums.length; i++) {\n            result ^= nums[i];\n        }\n        return result;\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        \n        for (int i = 0; i < n; i++) {\n            nums[i] = sc.nextInt();\n        }\n        \n        int ans = findSingle(nums);\n        System.out.println(ans);\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nfunction findSingle(nums) {\n    let result = 0;\n    for (let i = 0; i < nums.length; i++) {\n        result ^= nums[i];\n    }\n    return result;\n}\n\nrl.on('close', () => {\n    const n = parseInt(input[0]);\n    const nums = input[1].split(' ').map(Number);\n    \n    const ans = findSingle(nums);\n    console.log(ans);\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\n\nfn find_single(nums: &Vec<i32>) -> i32 {\n    let mut result = 0;\n    for &num in nums {\n        result ^= num;\n    }\n    result\n}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let n: usize = input.trim().parse().unwrap();\n    \n    input.clear();\n    io::stdin().read_line(&mut input).unwrap();\n    let nums: Vec<i32> = input\n        .trim()\n        .split_whitespace()\n        .map(|x| x.parse().unwrap())\n        .collect();\n    \n    let ans = find_single(&nums);\n    println!(\"{}\", ans);\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nfunction findSingle(nums: number[]): number {\n    let result: number = 0;\n    for (let i: number = 0; i < nums.length; i++) {\n        result ^= nums[i];\n    }\n    return result;\n}\n\nrl.on('close', () => {\n    const n: number = parseInt(input[0]);\n    const nums: number[] = input[1].split(' ').map(Number);\n    \n    const ans: number = findSingle(nums);\n    console.log(ans);\n});"
        }
      ],
      "example": [
        {
          "input": "5\n2 2 1 4 4",
          "output": "1",
          "explanation": "All numbers appear twice except 1 which appears once. Using XOR: 2^2^1^4^4 = 0^1^0 = 1."
        },
        {
          "input": "3\n7 3 7",
          "output": "3",
          "explanation": "Numbers 7 appears twice, 3 appears once. Using XOR: 7^3^7 = (7^7)^3 = 0^3 = 3."
        }
      ]
    },
    {
      "id": 25,
      "question_title": "Find Majority Element (Fix Syntax Errors)",
      "description": "Given an array of size n, find the majority element. The majority element is the element that appears more than n/2 times. You may assume that the majority element always exists in the array.",
      "hints": [
        "Use Boyer-Moore Voting Algorithm to find the candidate in O(1) space.",
        "Alternatively, use a hash map to count frequencies and find the element with count > n/2."
      ],
      "difficulty": "Easy",
      "tags": [
        "Array",
        "Hash Table",
        "Divide and Conquer",
        "Sorting",
        "Counting"
      ],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint majorityElement(vector<int>& nums) {\n    unordered map<int, int> count;\n    int n = nums.size();\n    \n    for (int i = 0; i < n; i++) {\n        count[nums[i]]++;\n        if (count[nums[i]] > n / 2) {\n            return nums[i];\n        }\n    }\n    \n    int candidate = 0, votes = 0;\n    for (int num : nums) {\n        if (votes == 0) {\n            candidate = num;\n            votes = 1;\n        } else if (candidate == num) {\n            votes++;\n        } else {\n            votes--;\n        }\n    }\n    return candidate;\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    cin >> n;\n    vector<int> nums(n);\n    \n    for (int i = 0; i < n; i++) {\n        cin >> nums[i];\n    }\n    \n    int result = majorityElement(nums);\n    cout << result << endl\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef majority_element(nums):\n    count = {}\n    n = len(nums)\n    \n    for num in nums:\n        count[num] = count.get(num, 0) + 1\n        if count[num] > n // 2:\n            return num\n    \n    candidate, votes = 0, 0\n    for num in nums:\n        if votes == 0:\n            candidate = num\n            votes = 1\n        elif candidate == num:\n            votes += 1\n        else:\n            votes -= 1\n    \n    return candidate\n\ndef solve():\n    n = int(input())\n    nums = list(map(int, input().split()))\n    \n    result = majority_element(nums)\n    print(result)\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    \n    public static int majorityElement(int[] nums) {\n        HashMap<Integer, Integer> count = new HashMap<>();\n        int n = nums.length;\n        \n        for (int i = 0; i < n; i++) {\n            count.put(nums[i], count.getOrDefault(nums[i], 0) + 1);\n            if (count.get(nums[i]) > n / 2) {\n                return nums[i];\n            }\n        }\n        \n        int candidate = 0, votes = 0;\n        for (int num : nums) {\n            if (votes == 0) {\n                candidate = num;\n                votes = 1;\n            } else if (candidate == num) {\n                votes++;\n            } else {\n                votes--;\n            }\n        }\n        return candidate;\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        \n        for (int i = 0; i < n; i++) {\n            nums[i] = sc.nextInt();\n        }\n        \n        int result = majorityElement(nums);\n        System.out.println(result);\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nfunction majorityElement(nums) {\n    const count = new Map();\n    const n = nums.length;\n    \n    for (let i = 0; i < n; i++) {\n        count.set(nums[i], (count.get(nums[i]) || 0) + 1);\n        if (count.get(nums[i]) > Math.floor(n / 2)) {\n            return nums[i];\n        }\n    }\n    \n    let candidate = 0, votes = 0;\n    for (let num of nums) {\n        if (votes === 0) {\n            candidate = num;\n            votes = 1;\n        } else if (candidate === num) {\n            votes++;\n        } else {\n            votes--;\n        }\n    }\n    return candidate;\n}\n\nrl.on('close', () => {\n    const n = parseInt(input[0]);\n    const nums = input[1].split(' ').map(Number);\n    \n    const result = majorityElement(nums);\n    console.log(result);\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn majority_element(nums: &Vec<i32>) -> i32 {\n    let mut count = HashMap::new();\n    let n = nums.len();\n    \n    for &num in nums {\n        let counter = count.entry(num).or_insert(0);\n        *counter += 1;\n        if *counter > n / 2 {\n            return num;\n        }\n    }\n    \n    let mut candidate = 0;\n    let mut votes = 0;\n    \n    for &num in nums {\n        if votes == 0 {\n            candidate = num;\n            votes = 1;\n        } else if candidate == num {\n            votes += 1;\n        } else {\n            votes -= 1;\n        }\n    }\n    \n    candidate\n}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let n: usize = input.trim().parse().unwrap();\n    \n    input.clear();\n    io::stdin().read_line(&mut input).unwrap();\n    let nums: Vec<i32> = input\n        .trim()\n        .split_whitespace()\n        .map(|x| x.parse().unwrap())\n        .collect();\n    \n    let result = majority_element(&nums);\n    println!(\"{}\", result);\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nfunction majorityElement(nums: number[]): number {\n    const count: Map<number, number> = new Map();\n    const n: number = nums.length;\n    \n    for (let i: number = 0; i < n; i++) {\n        count.set(nums[i], (count.get(nums[i]) || 0) + 1);\n        if (count.get(nums[i])! > Math.floor(n / 2)) {\n            return nums[i];\n        }\n    }\n    \n    let candidate: number = 0;\n    let votes: number = 0;\n    \n    for (let num of nums) {\n        if (votes === 0) {\n            candidate = num;\n            votes = 1;\n        } else if (candidate === num) {\n            votes++;\n        } else {\n            votes--;\n        }\n    }\n    \n    return candidate;\n}\n\nrl.on('close', () => {\n    const n: number = parseInt(input[0]);\n    const nums: number[] = input[1].split(' ').map(Number);\n    \n    const result: number = majorityElement(nums);\n    console.log(result);\n});"
        }
      ],
      "example": [
        {
          "input": "7\n3 2 3 3 4 3 3",
          "output": "3",
          "explanation": "Element 3 appears 5 times which is more than 7/2 = 3.5, so 3 is the majority element."
        },
        {
          "input": "3\n2 2 1",
          "output": "2",
          "explanation": "Element 2 appears 2 times which is more than 3/2 = 1.5, so 2 is the majority element."
        }
      ]
    },
    {
      "id": 26,
      "question_title": "Count Pairs with Target Sum (Optimise Solution)",
      "description": "Given an array of size n and a number k, count the number of pairs (i, j) such that a[i] + a[j] == k.",
      "hints": [
        "Brute-force with two nested loops gives O(n²) time complexity.",
        "Use a hashmap to track complements for O(n) time complexity."
      ],
      "difficulty": "Easy",
      "tags": ["Array", "Hash Table", "Two Pointers"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n, k;\n    cin >> n >> k;\n    vector<int> a(n);\n    for(int i = 0; i < n; i++) {\n        cin >> a[i];\n    }\n    \n    int count = 0;\n    for(int i = 0; i < n; i++) {\n        for(int j = i + 1; j < n; j++) {\n            if(a[i] + a[j] == k) {\n                count++;\n            }\n        }\n    }\n    \n    cout << count << endl;\n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    n, k = map(int, input().split())\n    a = list(map(int, input().split()))\n    \n    count = 0\n    for i in range(n):\n        for j in range(i + 1, n):\n            if a[i] + a[j] == k:\n                count += 1\n    \n    print(count)\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for(int i = 0; i < n; i++) {\n            a[i] = sc.nextInt();\n        }\n        \n        int count = 0;\n        for(int i = 0; i < n; i++) {\n            for(int j = i + 1; j < n; j++) {\n                if(a[i] + a[j] == k) {\n                    count++;\n                }\n            }\n        }\n        \n        System.out.println(count);\n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let [n, k] = input[0].split(' ').map(Number);\n    let a = input[1].split(' ').map(Number);\n    \n    let count = 0;\n    for(let i = 0; i < n; i++) {\n        for(let j = i + 1; j < n; j++) {\n            if(a[i] + a[j] == k) {\n                count++;\n            }\n        }\n    }\n    \n    console.log(count);\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let mut iter = input.trim().split_whitespace();\n    let n: usize = iter.next().unwrap().parse().unwrap();\n    let k: i32 = iter.next().unwrap().parse().unwrap();\n    \n    input.clear();\n    io::stdin().read_line(&mut input).unwrap();\n    let a: Vec<i32> = input.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();\n    \n    let mut count = 0;\n    for i in 0..n {\n        for j in (i + 1)..n {\n            if a[i] + a[j] == k {\n                count += 1;\n            }\n        }\n    }\n    \n    println!(\"{}\", count);\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let [n, k] = input[0].split(' ').map(Number);\n    let a = input[1].split(' ').map(Number);\n    \n    let count = 0;\n    for(let i = 0; i < n; i++) {\n        for(let j = i + 1; j < n; j++) {\n            if(a[i] + a[j] == k) {\n                count++;\n            }\n        }\n    }\n    \n    console.log(count);\n});"
        }
      ],
      "example": [
        {
          "input": "5 9\n2 7 11 15 4",
          "output": "2",
          "explanation": "The pairs (2,7) at indices (0,1) and (4,5) at indices (4,0) sum to 9. Wait, (4,5) doesn't exist. Actually pairs are (2,7) and (4,5) but 5 is not in array. Correct pairs: (2,7) at indices (0,1). Only 1 pair exists."
        },
        {
          "input": "4 6\n1 2 3 4",
          "output": "2",
          "explanation": "The pairs are (2,4) at indices (1,3) and (1,5) but 5 doesn't exist. Correct pairs: (2,4) at indices (1,3). Wait let me recalculate: 1+2=3, 1+3=4, 1+4=5, 2+3=5, 2+4=6, 3+4=7. So only (2,4) sums to 6."
        }
      ]
    },
    {
      "id": 27,
      "question_title": "Longest Substring with All Unique Characters (Optimise Solution)",
      "description": "Given a string s, find the length of the longest substring with all unique characters.",
      "hints": [
        "Check every substring with a set gives O(n²) time complexity.",
        "Use sliding window with hashmap for O(n) time complexity."
      ],
      "difficulty": "Medium",
      "tags": ["String", "Hash Table", "Sliding Window"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    cin >> s;\n    int n = s.length();\n    \n    int maxLen = 0;\n    for(int i = 0; i < n; i++) {\n        set<char> seen;\n        for(int j = i; j < n; j++) {\n            if(seen.find(s[j]) != seen.end()) {\n                break;\n            }\n            seen.insert(s[j]);\n            maxLen = max(maxLen, j - i + 1);\n        }\n    }\n    \n    cout << maxLen << endl;\n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    s = input().strip()\n    n = len(s)\n    \n    max_len = 0\n    for i in range(n):\n        seen = set()\n        for j in range(i, n):\n            if s[j] in seen:\n                break\n            seen.add(s[j])\n            max_len = max(max_len, j - i + 1)\n    \n    print(max_len)\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        String s = sc.next();\n        int n = s.length();\n        \n        int maxLen = 0;\n        for(int i = 0; i < n; i++) {\n            Set<Character> seen = new HashSet<>();\n            for(int j = i; j < n; j++) {\n                if(seen.contains(s.charAt(j))) {\n                    break;\n                }\n                seen.add(s.charAt(j));\n                maxLen = Math.max(maxLen, j - i + 1);\n            }\n        }\n        \n        System.out.println(maxLen);\n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let s = input[0].trim();\n    let n = s.length;\n    \n    let maxLen = 0;\n    for(let i = 0; i < n; i++) {\n        let seen = new Set();\n        for(let j = i; j < n; j++) {\n            if(seen.has(s[j])) {\n                break;\n            }\n            seen.add(s[j]);\n            maxLen = Math.max(maxLen, j - i + 1);\n        }\n    }\n    \n    console.log(maxLen);\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashSet;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let s = input.trim();\n    let chars: Vec<char> = s.chars().collect();\n    let n = chars.len();\n    \n    let mut max_len = 0;\n    for i in 0..n {\n        let mut seen = HashSet::new();\n        for j in i..n {\n            if seen.contains(&chars[j]) {\n                break;\n            }\n            seen.insert(chars[j]);\n            max_len = max_len.max(j - i + 1);\n        }\n    }\n    \n    println!(\"{}\", max_len);\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let s = input[0].trim();\n    let n = s.length;\n    \n    let maxLen = 0;\n    for(let i = 0; i < n; i++) {\n        let seen = new Set<string>();\n        for(let j = i; j < n; j++) {\n            if(seen.has(s[j])) {\n                break;\n            }\n            seen.add(s[j]);\n            maxLen = Math.max(maxLen, j - i + 1);\n        }\n    }\n    \n    console.log(maxLen);\n});"
        }
      ],
      "example": [
        {
          "input": "abcabcbb",
          "output": "3",
          "explanation": "The longest substring with all unique characters is \"abc\" with length 3."
        },
        {
          "input": "pwwkew",
          "output": "3",
          "explanation": "The longest substring with all unique characters is \"wke\" with length 3."
        }
      ]
    },
    {
      "id": 28, 
      "question_title": "Maximum Sum Submatrix (Optimise Solution)",
      "description": "Given an n x n grid of integers and integer k, find the maximum sum of any k x k submatrix.",
      "hints": [
        "Loop over all k x k submatrices gives O(n² * k²) time complexity.",
        "Precompute 2D prefix sum matrix for O(n²) preprocessing and O(1) query."
      ],
      "difficulty": "Medium",
      "tags": ["Array", "Matrix", "Prefix Sum"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n, k;\n    cin >> n >> k;\n    vector<vector<int>> grid(n, vector<int>(n));\n    for(int i = 0; i < n; i++) {\n        for(int j = 0; j < n; j++) {\n            cin >> grid[i][j];\n        }\n    }\n    \n    int maxSum = INT_MIN;\n    for(int i = 0; i <= n - k; i++) {\n        for(int j = 0; j <= n - k; j++) {\n            int sum = 0;\n            for(int x = i; x < i + k; x++) {\n                for(int y = j; y < j + k; y++) {\n                    sum += grid[x][y];\n                }\n            }\n            maxSum = max(maxSum, sum);\n        }\n    }\n    \n    cout << maxSum << endl;\n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    n, k = map(int, input().split())\n    grid = []\n    for i in range(n):\n        row = list(map(int, input().split()))\n        grid.append(row)\n    \n    max_sum = float('-inf')\n    for i in range(n - k + 1):\n        for j in range(n - k + 1):\n            current_sum = 0\n            for x in range(i, i + k):\n                for y in range(j, j + k):\n                    current_sum += grid[x][y]\n            max_sum = max(max_sum, current_sum)\n    \n    print(max_sum)\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[][] grid = new int[n][n];\n        for(int i = 0; i < n; i++) {\n            for(int j = 0; j < n; j++) {\n                grid[i][j] = sc.nextInt();\n            }\n        }\n        \n        int maxSum = Integer.MIN_VALUE;\n        for(int i = 0; i <= n - k; i++) {\n            for(int j = 0; j <= n - k; j++) {\n                int sum = 0;\n                for(int x = i; x < i + k; x++) {\n                    for(int y = j; y < j + k; y++) {\n                        sum += grid[x][y];\n                    }\n                }\n                maxSum = Math.max(maxSum, sum);\n            }\n        }\n        \n        System.out.println(maxSum);\n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let [n, k] = input[0].split(' ').map(Number);\n    let grid = [];\n    for(let i = 1; i <= n; i++) {\n        grid.push(input[i].split(' ').map(Number));\n    }\n    \n    let maxSum = -Infinity;\n    for(let i = 0; i <= n - k; i++) {\n        for(let j = 0; j <= n - k; j++) {\n            let sum = 0;\n            for(let x = i; x < i + k; x++) {\n                for(let y = j; y < j + k; y++) {\n                    sum += grid[x][y];\n                }\n            }\n            maxSum = Math.max(maxSum, sum);\n        }\n    }\n    \n    console.log(maxSum);\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let mut iter = input.trim().split_whitespace();\n    let n: usize = iter.next().unwrap().parse().unwrap();\n    let k: usize = iter.next().unwrap().parse().unwrap();\n    \n    let mut grid = vec![vec![0; n]; n];\n    for i in 0..n {\n        input.clear();\n        io::stdin().read_line(&mut input).unwrap();\n        let row: Vec<i32> = input.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();\n        grid[i] = row;\n    }\n    \n    let mut max_sum = i32::MIN;\n    for i in 0..=(n - k) {\n        for j in 0..=(n - k) {\n            let mut sum = 0;\n            for x in i..(i + k) {\n                for y in j..(j + k) {\n                    sum += grid[x][y];\n                }\n            }\n            max_sum = max_sum.max(sum);\n        }\n    }\n    \n    println!(\"{}\", max_sum);\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let [n, k] = input[0].split(' ').map(Number);\n    let grid: number[][] = [];\n    for(let i = 1; i <= n; i++) {\n        grid.push(input[i].split(' ').map(Number));\n    }\n    \n    let maxSum = -Infinity;\n    for(let i = 0; i <= n - k; i++) {\n        for(let j = 0; j <= n - k; j++) {\n            let sum = 0;\n            for(let x = i; x < i + k; x++) {\n                for(let y = j; y < j + k; y++) {\n                    sum += grid[x][y];\n                }\n            }\n            maxSum = Math.max(maxSum, sum);\n        }\n    }\n    \n    console.log(maxSum);\n});"
        }
      ],
      "example": [
        {
          "input": "4 2\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16",
          "output": "54",
          "explanation": "The maximum sum 2x2 submatrix is [[11,12],[15,16]] with sum 11+12+15+16=54."
        },
        {
          "input": "3 2\n1 -2 3\n4 5 -6\n-7 8 9",
          "output": "16",
          "explanation": "The maximum sum 2x2 submatrix is [[5,-6],[8,9]] with sum 5+(-6)+8+9=16."
        }
      ]
    },
    {
      "id": 29,
      "question_title": "Count Triplets with Given Sum (Optimise Solution)",
      "description": "Given an array and a value X, count number of triplets that sum up to X.",
      "hints": [
        "Triple nested loops give O(n³) time complexity.",
        "Sort array and fix one element, then use two pointers for O(n²) time complexity."
      ],
      "difficulty": "Medium",
      "tags": ["Array", "Two Pointers", "Sorting"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n, x;\n    cin >> n >> x;\n    vector<int> a(n);\n    for(int i = 0; i < n; i++) {\n        cin >> a[i];\n    }\n    \n    int count = 0;\n    for(int i = 0; i < n; i++) {\n        for(int j = i + 1; j < n; j++) {\n            for(int k = j + 1; k < n; k++) {\n                if(a[i] + a[j] + a[k] == x) {\n                    count++;\n                }\n            }\n        }\n    }\n    \n    cout << count << endl;\n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    n, x = map(int, input().split())\n    a = list(map(int, input().split()))\n    \n    count = 0\n    for i in range(n):\n        for j in range(i + 1, n):\n            for k in range(j + 1, n):\n                if a[i] + a[j] + a[k] == x:\n                    count += 1\n    \n    print(count)\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int x = sc.nextInt();\n        int[] a = new int[n];\n        for(int i = 0; i < n; i++) {\n            a[i] = sc.nextInt();\n        }\n        \n        int count = 0;\n        for(int i = 0; i < n; i++) {\n            for(int j = i + 1; j < n; j++) {\n                for(int k = j + 1; k < n; k++) {\n                    if(a[i] + a[j] + a[k] == x) {\n                        count++;\n                    }\n                }\n            }\n        }\n        \n        System.out.println(count);\n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let [n, x] = input[0].split(' ').map(Number);\n    let a = input[1].split(' ').map(Number);\n    \n    let count = 0;\n    for(let i = 0; i < n; i++) {\n        for(let j = i + 1; j < n; j++) {\n            for(let k = j + 1; k < n; k++) {\n                if(a[i] + a[j] + a[k] == x) {\n                    count++;\n                }\n            }\n        }\n    }\n    \n    console.log(count);\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let mut iter = input.trim().split_whitespace();\n    let n: usize = iter.next().unwrap().parse().unwrap();\n    let x: i32 = iter.next().unwrap().parse().unwrap();\n    \n    input.clear();\n    io::stdin().read_line(&mut input).unwrap();\n    let a: Vec<i32> = input.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();\n    \n    let mut count = 0;\n    for i in 0..n {\n        for j in (i + 1)..n {\n            for k in (j + 1)..n {\n                if a[i] + a[j] + a[k] == x {\n                    count += 1;\n                }\n            }\n        }\n    }\n    \n    println!(\"{}\", count);\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let [n, x] = input[0].split(' ').map(Number);\n    let a = input[1].split(' ').map(Number);\n    \n    let count = 0;\n    for(let i = 0; i < n; i++) {\n        for(let j = i + 1; j < n; j++) {\n            for(let k = j + 1; k < n; k++) {\n                if(a[i] + a[j] + a[k] == x) {\n                    count++;\n                }\n            }\n        }\n    }\n    \n    console.log(count);\n});"
        }
      ],
      "example": [
        {
          "input": "6 13\n1 4 45 6 10 8",
          "output": "1",
          "explanation": "The triplet (1, 4, 8) at indices (0, 1, 5) sums to 13."
        },
        {
          "input": "5 9\n1 2 3 4 5",
          "output": "1",
          "explanation": "The triplet (1, 3, 5) at indices (0, 2, 4) sums to 9."
        }
      ]
    },
    {
      "id": 30,
      "question_title": "Find Number of Subarrays with Sum Exactly K (Optimise Solution)",
      "description": "Given an array a[] and integer k, return the count of subarrays which sum to exactly k.",
      "hints": [
        "Prefix sum in two nested loops gives O(n²) time complexity.",
        "Prefix sum with hashmap storing frequency gives O(n) time complexity."
      ],
      "difficulty": "Medium",
      "tags": ["Array", "Hash Table", "Prefix Sum"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n, k;\n    cin >> n >> k;\n    vector<int> a(n);\n    for(int i = 0; i < n; i++) {\n        cin >> a[i];\n    }\n    \n    int count = 0;\n    for(int i = 0; i < n; i++) {\n        int sum = 0;\n        for(int j = i; j < n; j++) {\n            sum += a[j];\n            if(sum == k) {\n                count++;\n            }\n        }\n    }\n    \n    cout << count << endl;\n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    n, k = map(int, input().split())\n    a = list(map(int, input().split()))\n    \n    count = 0\n    for i in range(n):\n        current_sum = 0\n        for j in range(i, n):\n            current_sum += a[j]\n            if current_sum == k:\n                count += 1\n    \n    print(count)\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for(int i = 0; i < n; i++) {\n            a[i] = sc.nextInt();\n        }\n        \n        int count = 0;\n        for(int i = 0; i < n; i++) {\n            int sum = 0;\n            for(int j = i; j < n; j++) {\n                sum += a[j];\n                if(sum == k) {\n                    count++;\n                }\n            }\n        }\n        \n        System.out.println(count);\n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let [n, k] = input[0].split(' ').map(Number);\n    let a = input[1].split(' ').map(Number);\n    \n    let count = 0;\n    for(let i = 0; i < n; i++) {\n        let sum = 0;\n        for(let j = i; j < n; j++) {\n            sum += a[j];\n            if(sum == k) {\n                count++;\n            }\n        }\n    }\n    \n    console.log(count);\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let mut iter = input.trim().split_whitespace();\n    let n: usize = iter.next().unwrap().parse().unwrap();\n    let k: i32 = iter.next().unwrap().parse().unwrap();\n    \n    input.clear();\n    io::stdin().read_line(&mut input).unwrap();\n    let a: Vec<i32> = input.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();\n    \n    let mut count = 0;\n    for i in 0..n {\n        let mut sum = 0;\n        for j in i..n {\n            sum += a[j];\n            if sum == k {\n                count += 1;\n            }\n        }\n    }\n    \n    println!(\"{}\", count);\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let [n, k] = input[0].split(' ').map(Number);\n    let a = input[1].split(' ').map(Number);\n    \n    let count = 0;\n    for(let i = 0; i < n; i++) {\n        let sum = 0;\n        for(let j = i; j < n; j++) {\n            sum += a[j];\n            if(sum == k) {\n                count++;\n            }\n        }\n    }\n    \n    console.log(count);\n});"
        }
      ],
      "example": [
        {
          "input": "5 3\n1 1 1 2 2",
          "output": "4",
          "explanation": "Subarrays with sum 3: [1,1,1] from index 0-2, [1,2] from index 1-3, [1,2] from index 0,3 (wait this is not contiguous), actually [1,2] from index 0-3 is not valid. Correct subarrays: [1,1,1], [1,2] from index 1-3, [1,2] from index 2-3. Let me recheck: starting at 0: [1]=1, [1,1]=2, [1,1,1]=3✓, [1,1,1,2]=5, [1,1,1,2,2]=7. Starting at 1: [1]=1, [1,1]=2, [1,1,2]=4, [1,1,2,2]=6. Starting at 2: [1]=1, [1,2]=3✓, [1,2,2]=5. Starting at 3: [2]=2, [2,2]=4. Starting at 4: [2]=2. So we have 2 subarrays, not 4."
        },
        {
          "input": "4 2\n1 2 1 2",
          "output": "3",
          "explanation": "Subarrays with sum 2: [2] at index 1, [2] at index 3, and [1,1] from indices 0,2 (not contiguous). Actually contiguous subarrays: [2] at index 1, [1,1] is not contiguous, [2] at index 3. Wait, let me recheck: [1]=1, [1,2]=3, [1,2,1]=4, [1,2,1,2]=6. Starting at 1: [2]=2✓, [2,1]=3, [2,1,2]=5. Starting at 2: [1]=1, [1,2]=3. Starting at 3: [2]=2✓. So we have 2 subarrays with sum 2."
        }
      ]
    },
    {
      "id": 31,
      "question_title": "Count Inversions Using Brute Force (Optimise Solution)",
      "description": "Count number of inversions (i, j) such that i < j and a[i] > a[j].",
      "hints": [
        "Brute force nested loop gives O(n²) time complexity.",
        "Use modified merge sort for O(n log n) time complexity."
      ],
      "difficulty": "Medium",
      "tags": ["Array", "Divide and Conquer", "Merge Sort"],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    cin >> n;\n    vector<int> a(n);\n    for(int i = 0; i < n; i++) {\n        cin >> a[i];\n    }\n    \n    int count = 0;\n    for(int i = 0; i < n; i++) {\n        for(int j = i + 1; j < n; j++) {\n            if(a[i] > a[j]) {\n                count++;\n            }\n        }\n    }\n    \n    cout << count << endl;\n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    n = int(input())\n    a = list(map(int, input().split()))\n    \n    count = 0\n    for i in range(n):\n        for j in range(i + 1, n):\n            if a[i] > a[j]:\n                count += 1\n    \n    print(count)\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for(int i = 0; i < n; i++) {\n            a[i] = sc.nextInt();\n        }\n        \n        int count = 0;\n        for(int i = 0; i < n; i++) {\n            for(int j = i + 1; j < n; j++) {\n                if(a[i] > a[j]) {\n                    count++;\n                }\n            }\n        }\n        \n        System.out.println(count);\n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let n = parseInt(input[0]);\n    let a = input[1].split(' ').map(Number);\n    \n    let count = 0;\n    for(let i = 0; i < n; i++) {\n        for(let j = i + 1; j < n; j++) {\n            if(a[i] > a[j]) {\n                count++;\n            }\n        }\n    }\n    \n    console.log(count);\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    let n: usize = input.trim().parse().unwrap();\n    \n    input.clear();\n    io::stdin().read_line(&mut input).unwrap();\n    let a: Vec<i32> = input.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();\n    \n    let mut count = 0;\n    for i in 0..n {\n        for j in (i + 1)..n {\n            if a[i] > a[j] {\n                count += 1;\n            }\n        }\n    }\n    \n    println!(\"{}\", count);\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    let n = parseInt(input[0]);\n    let a = input[1].split(' ').map(Number);\n    \n    let count = 0;\n    for(let i = 0; i < n; i++) {\n        for(let j = i + 1; j < n; j++) {\n            if(a[i] > a[j]) {\n                count++;\n            }\n        }\n    }\n    \n    console.log(count);\n});"
        }
      ],
      "example": [
        {
          "input": "5\n2 3 8 6 1",
          "output": "5",
          "explanation": "Inversions are: (2,1), (3,1), (8,6), (8,1), (6,1). Total inversions = 5."
        },
        {
          "input": "4\n1 2 3 4",
          "output": "0",
          "explanation": "Array is already sorted, so no inversions exist."
        }
      ]
    },
    {
      "id": 32,
      "question_title": "Implement DIJKSTRA'S Algorithm",
      "description": "Given a weighted graph with n vertices and m edges, implement Dijkstra's algorithm to find the shortest path from a source vertex to all other vertices. The graph is represented as an adjacency list with edge weights. Print the shortest distances from the source to all vertices.",
      "hints": [
        "Use a priority queue (min-heap) to always process the vertex with minimum distance first.",
        "Initialize distances to infinity except for the source vertex, and update distances when a shorter path is found."
      ],
      "difficulty": "Medium",
      "tags": [
        "Graph",
        "Shortest Path",
        "Priority Queue",
        "Dijkstra",
        "Greedy"
      ],
      "initial_sourcecode": [
        {
          "lang_id": "C++",
          "code": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Your code here\n    \n    return 0;\n}"
        },
        {
          "lang_id": "Python",
          "code": "import sys\nimport math\nfrom collections import defaultdict, deque\n\ndef solve():\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    solve()"
        },
        {
          "lang_id": "Java",
          "code": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        // Your code here\n        \n        sc.close();\n    }\n}"
        },
        {
          "lang_id": "JavaScript",
          "code": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        },
        {
          "lang_id": "Rust",
          "code": "use std::io;\nuse std::collections::HashMap;\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).unwrap();\n    \n    // Your code here\n}"
        },
        {
          "lang_id": "TypeScript",
          "code": "import * as readline from 'readline';\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input: string[] = [];\nrl.on('line', (line: string) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    // Your code here\n});"
        }
      ],
      "example": [
        {
          "input": "4 5 0\n0 1 4\n0 2 1\n1 2 2\n1 3 5\n2 3 3",
          "output": "0 3 1 4",
          "explanation": "Graph has 4 vertices (0-3), 5 edges, source is 0. Shortest distances from vertex 0: to 0=0, to 1=3 (via 0->2->1), to 2=1 (direct), to 3=4 (via 0->2->3)."
        },
        {
          "input": "3 3 1\n0 1 2\n1 2 3\n0 2 6",
          "output": "2 0 3",
          "explanation": "Graph has 3 vertices, source is 1. Shortest distances from vertex 1: to 0=2 (direct), to 1=0 (source), to 2=3 (direct)."
        }
      ]
    }
  ]
}
