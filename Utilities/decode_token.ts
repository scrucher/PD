import jwt from "jsonwebtoken";

const decode_token = (token: string) =>{
    const key = 
`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxUuKAfPu2dsMgjNAXL7b
hZmKBXrMJGStbA5lacWpMbx5zwTiBIAI/TblSKVfCZWI9ettfxPtiz4uAesznEgk
WUIa7K98sRuoFWg8bZvmLnXcMZB9bKn180JJ7ipz8zVCaoe37rjZJT1RqgOhnPeN
PAMgw/a8RqR2jrPxbcYOrnGOscUkPteSCZsUc8yL89rNxRzJCq8ZjXWuIE3UxZHR
F+U/RKx07T4PMU9mZfXy+GPv2pdKpcjCE+8WnbG1zTjP5VP5TkGOS1azf6uK+FEI
vW67DoXXpdD22o82ug6q9SwxGwYnkJTwy01+TOYu18cqvQ1Faa2OtuiFUdJFF3nh
iwIDAQAB
-----END PUBLIC KEY-----`;
    
    const decoded = jwt.verify(token, key);
    return decoded;
}
export default decode_token;