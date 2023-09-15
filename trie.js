/* Write a program that accepts string tokens in the format of token1:token2:token3:token4,
where: is used as a delimiter to separate tokens. There should be two functions, ingest
and appearance.
ingest takes a string, and stores it in the collection.
appearance takes a string as input. It returns a normalized value between 0 to 1, 
where the value represents the percentage of appearances of stored tokens that
have input as the prefix.
State the space and time complexity of your solution.
*/ 

function Node(token) {
  this.token = token;
  this.access_count = 0; // the access count for this node, used for appearance function
  this.children = new Map(); // children are stored as Map, where the key is the letter and the value is a TrieNode
}

class Trie {
  constructor() {
    this.root = new Node(null);
    this.total_count = 0; // the total number of token_string ingested
  }

  ingest(token_string) {
    let current_node = this.root;
    //Split the token into an array
    const token_array = token_string.split(":");
    for (let token of token_array) {
      if (!current_node.children.has(token)) {
        current_node.children.set(token, new Node(token));
      }
      // access_count ++
      current_node.access_count++;
      current_node = current_node.children.get(token);
    }
    // the last token node access_count++
    current_node.access_count++;
    // everytime ingest, total count++
    this.total_count++;
  }

  appearance(token_string) {
    let current_node = this.root;
    //Split the token into an array
    const token_array = token_string.split(":");
    for (let token of token_array) {
      if (!current_node.children.has(token)) {
        return 0;
      }
      current_node = current_node.children.get(token);
    }
    const value = current_node.access_count / this.total_count;
    return value;
  }
}

let TokenCollection = new Trie();
function ingest(str) {
  TokenCollection.ingest(str);
}
function appearance(str) {
  console.log(TokenCollection.appearance(str));
}
ingest("skyblue:uk:dev");
ingest("skyblue:hk:design");
ingest("skyblue:hk:pm");
ingest("skyblue:hk:dev");
ingest("google");
appearance("skyblue"); // > 0.8
appearance("skyblue:hk"); // > 0.6
ingest("google:london:ealing:dev");
ingest("google:london:croydon");
ingest("google:london:design");
ingest("google:man:pm");
ingest("google:man:pm"); // if the token string are same as the inputted token_string, it still accept it. Then the appearance of "google:man" is 0.2, which is 2 matched tokens out of 10 token strings.
appearance("google:man"); // > 0.2
ingest("::::hi"); // if the token of the token string is an empty string, it still works.
appearance("::"); // > 0.09090909090909091
appearance(":hi"); // > 0

function printTrie(node, indent = 0) {
  if (node === null) {
    return;
  }

  console.log(" ".repeat(indent), node.token);

  for (let [token, childNode] of node.children) {
    printTrie(childNode, indent + 2);
  }
}

printTrie(TokenCollection.root);

// The time complexity of ingest(token_string) is O(k), where k is the length of the token_string. This is because the function iterates over each character in the string.
// The space complexity of ingest(token_string) is O(k), the function creates a new node for each token in the string and stores the node in the children map of the parent node. Therefore, the space used by the trie is proportional to the length of the input string.
// The time complexity of appearance(token_string) is O(k), where k is the length of the token_string. This is because the function iterates over each character in the string.
// The space complexity of appearance(token_string) is O(1). The function does not create any new nodes or data structures that depend on the length of the input string. Therefore, the space used by the function is constant with respect to the length of the input string.

