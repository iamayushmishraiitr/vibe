#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define mk make_pair
#define vvll vector<vector<ll>>
#define vvc vector<vector<char>>
#define vss vector<string>
#define emp emplace
#define pb push_back
#define pf push_front
#define dq deque
#define llmn LONG_LONG_MIN
#define llmx LONG_LONG_MAX
#define umll unordered_map<ll,ll>
#define mll map<ll, ll>
#define sll set<ll>
#define usll unordered_set<ll>
#define vll vector<ll>
#define vpll vector<pair<ll, ll>>
#define pll pair<ll, ll>
#define frr(i, a, b, c) for (ll i = a; i < b; i += c)
#define fr(i, a, b) for (ll i = a; i < b; i++)
#define rfr(i, a, b) for (ll i = a; i > b; i--)
#define rrfr(i, a, b, c) for (ll i = a; i > b; i -= c)
#define fastio   ios_base::sync_with_stdio(false); cin.tie(NULL);
#define all(x) x.begin() , x.end()
const ll M = 1e9 + 7;
const ll M2 = 998244353;
ll mod(ll x)
{
    return ((x % M + M) % M);
}
 
ll mul(ll a, ll b)
{
    return mod(mod(a) * mod(b));
}
 
ll lcm(ll a, ll b)
{
    return (a * b) / (__gcd(a, b));
}
bool issqrt(long double x){
    if (x >= 0){
        long long sr = sqrt(x);
        return (sr * sr == x);
    }
    return false;
}
int msb(int n)
{
    if (n == 0)
        return 0;
 
    int msb = 0;
    n = n / 2;
    while (n != 0) {
        n = n / 2;
        msb++;
    }
 
    return (msb);
}
ll xo(ll n)
{
     ll z= n+1 ;
     if(z%4==1) return (z-1) ;
     if(z%4==2) return 1 ;
     if(z%4==3) return z ;
     else return 0 ;
}
bool isprime(ll n)
{
      ll b=0 ;
      for(ll i=2 ;i*i<=n ;i++)
      {
          if(n%i==0)
          { b++ ;
          break;}
      }
      if(b) return false ;
      else return true ;
}
 void yes() {
    cout<<"YES"<<endl;
}
void no() {
    cout<<"NO"<<endl;
}
ll powll(ll a,ll b)
{
     ll ans=1 ;
     fr(i,0,b) ans*=a ; 
     return ans ;
}
ll dp[3005][3005][3] ;
ll f(ll l ,ll r, vll v ,ll turn)
{
    if(dp[l][r][turn]!=-1) return dp[l][r][turn] ;
    if(l>r) return 0 ;
      if(turn==0) return  dp[l][r][turn]= max(v[l]+f(l+1,r,v,1) ,v[r]+ f(l,r-1,v,1)) ;
      else if (turn==1) return  dp[l][r][turn]= min(f(l+1,r,v,0) ,f(l,r-1,v,0)) ;
}

void solve()
{  
    ll n ;
    cin>> n ;
    ll sum=0 ;
    memset(dp,-1,sizeof(dp)) ;
    vll v(n) ;
    fr(i,0,n) cin>> v[i] ,sum+=v[i] ;
   fr(i,0,n) dp[i][i][0]=v[i] ,dp[i][i][1]=0 ;
    f(0,n-1,v,0)  ;
    cout << 2*dp[0][n-1][0]-sum<< endl ;
     
}
signed main ()
{
    fastio;
    ll t=1 ; 
   //cin>> t ;
    while(t--)
   solve() ;
     
    return 0;
} 