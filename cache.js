/* 
get(key)
Return the value associated with the specified key if it exists in the cache, else
return -1 .
put(key, value, weight)
Associate value with key in the cache, such that value might be later retrieved by
get(key) .
Cache has a fixed capacity, and when such capacity is reached, key with the least
score must be invalidated until the number of key s falls within cache capacity. The
score is calculated as follows:
Oursky Developer Pre-Test 2023 3
weight ∕ [ln(current_time - last_accessed_time + 1) + 1]
Implementation of the cache should be optimized on the time complexity of get(key) .
For example, the average time complexity of get(key) could be constant.
For the purpose of implementing the cache, you could assume that common data
structures, such as arrays, different types of lists, and hash tables, are available.
At the end of the answer, give and explain the computational complexity of get(key) and
put(...) in Big O notation.
*/

/**
 * @param {number} n for capacity limit
 */

class FixedCapacityCache {
  // initiation
  constructor(n) {
    this.cache_map = new Map();
    this.capacity_limit = n;
  }

  /**
   * function - get
   * @param {number} key
   * @return {number} value associated with key
   * @return -1 if key not exist
   */
  get(key) {
    if (!this.cache_map.has(key)) {
      // not exist
      return -1;
    } else {
      const selected_map_item = this.cache_map.get(key);
      // set value to update last_accessed_time
      this.cache_map.set(key, {
        value: selected_map_item.value,
        weight: selected_map_item.weight,
        last_accessed_time: new Date(),
      });
      return selected_map_item.value;
    }
  }

  /**
   * function - put
   * @param {number} key
   * @param {number} value
   * @param {number} weight
   * @return {boolean} return true if key already existed / else false
   */
  put(key, value, weight) {
    // set OR overwritevalue function
    const setValue = () => {
      const current_time = new Date();
      // set value
      this.cache_map.set(key, {
        value: value,
        weight: weight,
        last_accessed_time: current_time,
      });
        
      /*
      (The logic the the removeTheInvalidatedKey)
        set the pair of key and value into the cache, if it exceeds the capacity limit, it will find out the key with minimum score.
        that key is in invalidate status, in order to maintain the cache, It will delete the invalidate key.
      
      (Why the logic is that)
        In my logic, I will calculate the n+1 's key. The n keys are in cache and the extra 1 is the new set key.
        Because the new set key's score maybe has the minimum score around them, so I would include the new set key and then calculate all the score.
      */
      
      // removeTheInvalidatedKey
      if (this.cache_map.size > this.capacity_limit) {
        const calculateTheScoreOfKey = (item) => {
          // score formula, Max.log in javscript is base of e, so its ln
          const score = (
            item[1].weight /
            (Math.log(current_time - item[1].last_accessed_time + 1) + 1)
          );
          console.log('Score of', item[0], 'is',  score)
          return score;
        };

        const minScoreKey = Array.from(this.cache_map).reduce((a, b) =>
          calculateTheScoreOfKey(b) < calculateTheScoreOfKey(a) ? b : a
        )[0];
        this.cache_map.delete(minScoreKey);
      }
    };

    // if key is not exist - false
    if (!this.cache_map.has(key)) {
      setValue();
      return false;
    } else {
      // if key is exist - true => replace the old key value with new value
      setValue();
      return true;
    }
  }
}

// Your FixedCapacityCache object will be instantiated and called as such:

var obj = new FixedCapacityCache(2);  // n = 2
obj.put('A', 10, 100); 
setTimeout(() => obj.put('B', 20, 98),100);
setTimeout(() => obj.put('C', 30, 50),200); // after put C into the cache, it exceeds the limit, hence calculate the score of each keys
setTimeout(() => console.log(obj),300);

/*
Score of key A : 15.86469343...
Score of key B : 17.45287562...
Score of key C : 50 , same as his weight
Therefore, the score of key A is the minimum score around them, we remove key A from the cache.
*/

// The computational complexity of get(key) is a constant as O(1). It checks the key is exist or not, if yes it will update the last_access_time and return the value. 
// The computational complexity of put(...) os O(n). When the cache is full, and a new key is added. It iterates n key to find out the minimum score around them.
