#include<bits/stdc++.h>
using namespace std;
int main()
{
    vector<int> stock = {3 , 3 , 4 , 7 ,8}; 
    // int n = arr.size();
    int d = 5;

    int no_of_triplets = 0;

    unordered_map<int, int> remainderFreq;

    // Count remainder frequencies
    for (int i = 0; i < stock.size(); i++) {
        int remainder = stock[i] % d;
        remainderFreq[remainder]++;
    }

    // Count triplets
    for (int i = 0; i < stock.size(); i++) {
        for (int j = i + 1; j < stock.size(); j++) {
            int remainder1 = stock[i] % d;
            int remainder2 = stock[j] % d;
            int target_remainder = (d - (remainder1 + remainder2) % d) % d; // To ensure positive remainder
            if (remainderFreq.find(target_remainder) != remainderFreq.end()) {
                no_of_triplets += remainderFreq[target_remainder];
            }
            if ((i == j) && ((stock[i] + stock[j]) % d == 0)) {
                no_of_triplets--;
            }
        }
    }

    cout<<no_of_triplets/3;

    return 0;
}