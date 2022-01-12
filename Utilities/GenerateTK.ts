
import jwt from "jsonwebtoken";
import { Payload } from "./payload";

const key = 
`-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAxUuKAfPu2dsMgjNAXL7bhZmKBXrMJGStbA5lacWpMbx5zwTi
BIAI/TblSKVfCZWI9ettfxPtiz4uAesznEgkWUIa7K98sRuoFWg8bZvmLnXcMZB9
bKn180JJ7ipz8zVCaoe37rjZJT1RqgOhnPeNPAMgw/a8RqR2jrPxbcYOrnGOscUk
PteSCZsUc8yL89rNxRzJCq8ZjXWuIE3UxZHRF+U/RKx07T4PMU9mZfXy+GPv2pdK
pcjCE+8WnbG1zTjP5VP5TkGOS1azf6uK+FEIvW67DoXXpdD22o82ug6q9SwxGwYn
kJTwy01+TOYu18cqvQ1Faa2OtuiFUdJFF3nhiwIDAQABAoIBAQCuRKsCTpULmZDS
8LJJOcxtldF0RaNMAiGs8Ipjg1SPugtd8NIzZ2SJRZQBNxFbRdpUXj+5n8CS3bmF
uFs+D/sLXHir19YsGmG9hvTZXHtVToXQwfAHq5iz5jmnRZhlmwWvU3IESwKDAkbA
BbUbEQ6Pk7O9ZJOpUlvmcMswS2FscxRKsd7ewCrh997fnN/ZmW4gG3H0NjGNTMRp
TQXCAwroTSxGzHJ7MZK5Ehje+hGjVQB0jtRH7dYMgi8+BLDhVnsBvDhiT0bGRkj+
j3xINRD/2Lkzz7WXXAkuUSW2lxZEo6HoeqPbih5Z/G2fNUYjwLnLaEUIT7FwcquR
VOPMYWIBAoGBAOsUfgoUd9LLdtdnC2cNI47POg1/Lq2IXaNduGucyx3XDe6c+Q9F
5nQgGF/c9nD7Lmp2n9oK+2iXmKikwrdPjnNHzxLHy4QwnkxLSzizd1lqHFsHtwOw
xEgRQl/k8gb5V4y8h5o3Cn4OPwfTpII4PwuFBYn2luEY7ecukyfUZ7kzAoGBANba
Pkk3ZcohQqkQK2yMvgElrOCNcmLykBwRnPxo1+hpod9/HkU2iX+1NYfyD0iv6acH
WS/5Ltyx3U/UMXCqonP/6R5uFjGiF5MxuIH/AcN4Ns98FYsv+7LYLyyOXmNUlli/
KgNqmi7vUTlbzwYXXUD8uffNkPl35LNY4Oni9aZJAoGALCm1Y/9kY12F/gGFyt5V
B8c2iMKT6lXsAXzh4JWcMwbrvyAOSig/myFMcvX39lG57pZKgZP+ly+jpksNqZJw
mIetB0IxoavgkUSz5PsSOOIOYauZXkAfH8reRVWlglnlcLMaZoZgmj3i6X2BMlWO
woNC/yAsSC1+xCejzZ/BvLECgYB4moGkL8ifshPtOvplMIvnsPJeCohPKsHiP7DT
rzaja8hF4OFpELgWS+4EpcgWkUijTeiumT3I/L6ydPZbvCz82IZPYpRqwAZjxeFA
d5jR1MVPquOdAg5T0i6I4FHziCPtJUG8MTbjacs6W2LWlH7wX+00QNxEbRyf4CBA
qfoioQKBgQCsQVoKUbBf/cM2UdQmM2jqk4rHs3dwHw4eB6Z0vMWUwR86sIDKXELJ
piqP9jNVpjyoD+NHiRfE9gdbWlQGqoVP8BH0YY/Wr4sdFac6RykKziB1oqP1Lbhl
KScGCloyHgoQb9p0aidoNCEpem0izvmaG5XxFs73ZZtwdBj1PR0uSA==
-----END RSA PRIVATE KEY-----`



export default (payload: Payload): string => {
   
    const token = jwt.sign({
        payload
    },
    key, {algorithm: "RS256"});
    console.log(token);
    return token;
}
