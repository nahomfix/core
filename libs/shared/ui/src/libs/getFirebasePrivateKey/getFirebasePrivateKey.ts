import { decrypt } from '../crypto'
import { webDecrypt } from '../crypto/webDecrypt'

/** Encrypted Firebase Private Keys
 *
 * Use the encrypt function from ../crypto to generate key, iv, encrypted tuple
 * where message input is a firebase private key.
 *
 * key and iv values are to be stored in environment variables in the relevant
 * environments.
 *
 */
const FIREBASE_PRIVATE_KEY_ENC = {
  // test
  // encrypted message is hello world
  test: '96544d708c4591e186dab86db36b9e56',
  // dev
  // project_id: jesus-film-development-bedd3
  // private_key_id: f2967ad2c166b191cbce275f65b341a7ecdfe21d
  dev: 'cdd32112f5218b830b61c9cd42bf4f9d92f20721f97fafb544b2ca8dcf63100333e88bec5cc08ad56f362ab634fee0e185346b067333fceb71b49550ec77389d5058333c5da240d47e764a953d185c49ba3ce939fa9fe57faa957a39817c66b77ad34d56a96a438161856b2d9ea4b3b67dd590fe4b8ff7a9fa49c176fe8832221adc5b86842ce02f84d7a2e66d2f54617972ea2667818eaa4c75e69c361a3e9be8937ee5989209154b4c68252ffaedbb7cd2c63d5d8159dac35a3384710a08cdb41c7135941c8fbe3ec97881b386e59dc862d52bf1e316538245d229ba812dcd0d3b1b49435d173467051e1193aa1380cc719b3f23242fde0167cef11fb16847627034bd2303db0e479584f1459bdf1a21d3f700b1e08ea5cb08aec898cb385946bc08c6b81081d682c4d3b25c22c6a99023e9932a67bb7fd09147c4238bb0a5898b9e494a09c2e1e000cc4dad9d39ea118ab2a05db090cdd85667dfbec0c6c351f125cd9575f0720b762c8c5b4afd4d3f4ebf7e8d53061dedf72dff4fafad4a5513cbc4fd7ea12a4586fd4086cfda261a35de2a0064b25229b2dd75ee8a2ffcb3ec1929580c2b92e9a92962f2f37b2374bce4d3626061ce0bedd90888e0d07e21736f508058b55f2457831a424e5da1fdb4168d381abf20f274d263dfb33e2e9071beb6648ccd26247361aa58d63a94d159afd9a6dfc8151f9467389ef9ad745660051143c7beecf97450596b8dcb39cadb29027c0a5831c28359e4e0694eb6f25b55ec738c1dd00884801dae0b2b6ea6c503cff3e61bb2c172c13e3256d7026c832e8b667992bcf95ebe08544b4c4719e97010a935395173063b690a3b1ab5cd25a212f6b878e7322de462785ab2359060e56be74ef8554252be1453227cd671e73a93a11185d17c5814a83c5fe35f6b246466fb845a1532c4e8e67ae42c3aef04f33258cb8a2cb4215c703d6a3b6a58a3cd11707a4280088a4f980b043902d7760087570ba542f4cb9e5299e4d75e6f8ecdc66f0566add41ab0bc33d446a6df2cf133dae7e5b042911d3b4c74862d7bddd52ed62f7291bafc790cfa85be12be413f4203566c24c784c64fca3107a3ead1a796afd2bf98a3306f12149b87c91d995bd19a434528a5dbeb41aa4fe30053102d6fccf77c8683ebcb393c11bd200a58a7458cc6d251337dba882f75c1dc2001a65b65b2f8af85718268e1d3503661dfe3265c5a040bad82c5be924981c996ee376130362f33669e2f4009f0c9a60835306210f54b0c9dc7cc7d37f30f4c1c4199878091fe696d622dcacbe3620c8761e07812f69672a65b940f4d9189f1f0b83e7db2bdce902405addceb687d3f1bc23c974212187f4af3d68537153d108bb57333d1b81b72bf1cc21b53e0a55393a30d1a1ea104e1187b785354d95fb604be88ea8a5269dd0103b004d1656884a42f4b80c3e6ef5db5d8d236ceeabf51eb7bc1c72e491561a7aa32a1d0b7da318094e7224679bba0e5fcc81ff50e92252e18ead6db6ae533748aff25220ffd96b875faafa81eeb16fa0d093dc0f2520fd04da10fb578b77906e8088c73971304704f2ea2fa05294a57702d05bb80711405adf896dab179feb4957d946b1b595623fbf6227b4ea0a8f4bc40f1c4d9ad77db7e947091864eb62dce7d83c4d4d8d52d3697b76569850a0d78219e38481bccca929e11d928a55f2183a4632b0010e1c2d30615c509ccdf3c78e923de4c33ca12c67109b83329b47921f3e1f3ad11569f3d18213471352609c98ccd73a620e72da8048076b9c6a2eb09d0a8454ada3521a4370b2707d9a785d662aafa5bdb5a5c49cf2495ae1e12f13d92391b20808381eab4e89e291522fbedead107d6e13a3edb2dd0163fd3accdffeb580352f60d045139e2015bcb4f846db60279540215ec3d226bcf862d12978dedfc38a33f284cb96bd040d3b9c262857b5822b2088f4cd62a4f8917170e6b0639d7ae8c7222ec39f0ca31ea559268a3cbd3f2f41a66f31b4fa1612c51bdf648228fb5a26f95683b2a0a8340019ad231951f2bbfaee0a3511bd39e8976d22aeb60d6eaac509857b81edb556055fb86cd1d0f663400c500b9612dba68ff66431de0af7909ad60442dffafea754651d0b78fdda69daac151fcdcff4d54290d95c37c8353246a2839013d410d6d30d39345b4839daf5585ea14ba6c8478a9832357b458bbd526429886eb4e1a1244700088ed13f36492617d2a970cb4cbc3c6fc1fbb2d19559e57457b3484cd028b0c0356848c3151238e9516be65094a5eeb68d0ff39d58951176a500e83adff19826c9211ce3f006621d8049b236ec65e9b3f6a8343f7335fc63f6db4e1dd7e57a96da60c3935f7737ac2e347d58067c1802e815fb331ce8940dc2536d5407840ab677b1eebde64703f',
  // core.stg
  // project_id: jesus-film-stage
  // private_key_id: 0ecf8f5fd51a53b990c02e8f2a8b5abe64791997
  stg: '91935f363628d456005a71f2226eea53b77d8927472844bf4b775b637e54842fc29101db4e7fe60f72d349c028855538c58aca17aa065658dfa93d2e560ec9630a41f9dc57120c329d07b3bb236f8784b7b06f2c7572403389586c3e4c6590d2958e222aa5dd11b86223d5e042a2de58027669fa34d3f651b5b0004816e76bb8bcc838c0d8480b86191cd40246b5ec59799cb1637ebab4d0ec6c347e556c7e7c9596791be2d4ebaf5ea6b85e81fcaf0c2b80e77831a207791ab8a176a340b1baa3179bfaaf710f8520f322e736ce4adefe281f9ca0c7bd01a5f7debea33a945e276e9e725be622133b5f97637b8633a876bc0ee9bbbeab90093eb0e20838159a53cdc26da33b816a972d6c8c4607e4276667406f3f9f40c717b0f1a582fbfb96b00ee6653f0eabf89b497d5f86751ee669343f4a6b9783c2029dd1e7a61283ce838608a4fd509129173fc0767edd930c745a21ff2e460df78a49b983fcad4402d0b2137c38e6817b4e2984da67afe47c6606dce337a6cac168ed4a7d30ce3d6280e00d6fcd9af49f3d8b24587276857fa30e485d000b8375c8acdf68acb916aceb378f86cc55b53875a06da289f620653633071763093a697760c4987f50ff1dc453921a3619e8f87cec02d574570794b89c310b5047e645bbdb88732be9468277d004b23e6c9652d3d7b53bfd278e0b476e9ef5555f70f4e714b5ddecc8256db6bd6d2b7786217140ae3c7fb9053c65a4be883d9cedf73247661e226d233fc0bd39ac848497e327decd45d65aeb6b10a23221a7d52c3a1ea311761757de5c5b9194f257c00e90d91c92118d34a7cb4aeb10872f3a05225183a95f0f52ce84044a751a7a86ff41d1a73eba9fc0e887f0bfe36314316b2c1e30d6a9ecc911337aa20e6b1300600f011f6660c00b70da8acbd88b4b6db8d586e21b947a334e173fe2ce901332f4d95435f8bc7d8b58624bcc921455620c27c4cd49bfca816dcfd62e548fc71d9c372ca470f01e8db32697e68b76632a2d21b6d9bc9af239b7f7b7e740428816fbbb2396ca0d0ef61e97f4ed2130550fcf2802434da138930350bf6e256a2a26eeb0239e2dcb79abd78edb14d0751741e9cf37681700e58b1fa9654c5106916509451d6bc1061c0c25c55e4679b2881c7a1f652fcbe3406b380ebe20575e3815661fc20a4e06df2150dbf15067835b617f683aab8b9746ac11aee0ca837c5fa0aca907ddcc813fa57dc344f2f4f20d6fbb2dbad58a41909cd68fd458e7e4fe94b68b3f547ec2a91051337adfef7a574a1e54300800e85d64f17ded09bd8bebf1b3a11790af7ad4c29b44f270daf73b091d905a92c3b07279c583801d1bcff27c93aa620b4799843aba0db71dd4e84e4c5a5ca2d51fa7b37a99ad540370292ea1cc30a2587a92752c1c8050b6355312acd33af82bbb35048725c2353cad4d8cfb98112282a9d5eba71efeddd5a9d4fbe4cee9318a5011ab9f24c9cdb026d82697d44d759143fd79decc263d95d819eb8e1b6e8a5592c03d38a4ff5493f20b9355817b548ebf313c19efc8167cce749e4d0f5210bf14a451282e68920a01b950f3929821c7ff57f98faff043eece25301244710081438d02a350c7bb5b38ead8e561f6513b8af8ee38a4acdb11f4d6c14409463cb472a2deea155d717998fdedc0f39018d3055dbee3ffb7b080ba258f5a426eb918e22a9d201128c056db856dc79a669feeb4f72029d01d293276435a26474c7eafaeb7f62fda5a368e78b316a3f6c80627f3972cc87ef1f6ba51c264f8e026ecdea1614c3aadd6c68d1bb1d630f120526f25a09c43a6b7ad8ac17ef07d4a4af3138b49552d74907f025d48ec6c66d4a28d0e40244a76783454fd050b47322bb8c71ae85362487f843060bbdc993c078cfef609f9691bb48a96e042900b1ae218db2ae9f14791f341a0c148b6f36815da124397dce15bb1e7cf05c60928dc4b06dc72684b88213e84283e20e13bf75c468146e3f9e27772a26fd464cc38213be0beb5373affc4cfa8a91284796608fb43b6618e6cee04fc433c1e8a0cf77011f3ac2d6298570f0f412b58e02d49062f9115e0763b9d43ea6efd9a5681b69d348f10dcf9d53c7bccf0aa47925228bbc37d379ea0f864e69a54ca3a4eb5030ab0bcafb4a2b57813f03c4db1696de6fb4a915bcf3fe005cb947d64afcd7472bc7c0d623955d1312aad11bf3377938b6b6bcbd8ddd8714e9217666d1c56ffe384700704e34225fd6aba284d992116849a26b169b59dd59e640bb156c6023a60d6b35e5b67a5eee118b384b29f9933a71793f58b747307b45c604a84b3466ebc3ca2c9cbbd09c296210d76870eadb9518c7640b2711b9843414adf44c6519994d57c20fc1bd9486823891ff814cfca1a1517f69ba544428f3c163c',
  // core.prd
  // project_id: jesus-film
  // private_key_id: 4dc30796add53ea40433fc71020c1e9d17c40360
  prd: '2e62b50d8f4285ed8d063a7963e9e56360582d45e44353e631b71acf7d97c6221a9a0a78f55c5f5bda63814258294cdc01d7f2eef22cfb73405dfcdb4b7e4219dd240f39aa907b3316259441df6801b1c2790a85e321502b939caec03db57c4fc835a17c193470720befafd1a6ca98e43f261d6fa7f6c8017ed430c37445f8f8bb800a39218abaabe6c0a0373b151f1bf84920c645f72dc962549dd896b1c0f04b3c1d31c85538524f28b406893d93dd8be727fde0a37a6bef531297236797a72204bb5e3eee039af703741967ddbb359d83135a02dde51dfcb31a73eac0c326abb833c198036f4525bd0dc3e0d05934d9b987f262eb26bc36e8e2112f36b56783d6c58e4590513443fd2d9892398fd3f44818fc26c8a71f4190ef778a5dc2799e9f977fde6b4dd7fd11b9f0813a0e5eb2e983f7a81d1b7056b055244004969279bb6fa63a91a0e89fbb68efca2bf9a8b64024a48c5e236685a7bb6d0c0fb284c3b3b54bec11a688f7d2a437400ead5a3b5f53b6e56bcca449d9e164c6bd7c5838bb6a4ca2aa318197c8490b9889881a6445dc57d907104bf3bcc1c962748a13dd30dc3762d14efffac1ff78490966e6fb8778ad164eb3019ab81bac26a96afb45dc7173b629a79fc8845423c9e2d0562c0102e007d4c23d5bd9399d5b6c7f20144b6569a63fa1ca5e77dffb67fd514bcf616b2aa2688e3bf9ebdaee4b9f664c6d7c966f348d34b430935474faefe2ee3294fcc687d2548035617f62208d8b5239e9c54ed74e74c26b9cbd3789b25d118f33643ed3d808b714cae9c452e0953558b246ed6d6ecdce7bf090c60c52fd738fa7e8ce13501c9d52764bb20709091a7c65d8fba7016aa976e297f23f77d8cc19f2d3dc82e89e250d903542391741c45055931f2d8ebd61b8ea320c7a60fe500fd56bc2087820f2a49cae1ff00aef4bedc13126c24c2d2be9eb2755696ff9327b249f0f40c79feeb989623eb08df686da5adcffb481a870c32e964803d31a3a3d825c024ce0f3849785bfebcee303d3845df4e438c8167d216e107c404d25e0e11771643267b57968e3165e07d944bdec8822c9bb94a6c8a98865fbe54c26c471296c35a4aa77a0c65a8ab594d10a06d344570782b538a776d268bdc850a3efd20c6398d0d61244ce63d522ff5d734d9bf51c5e6ca1ddbca15313792abc3e5d239b76d02a92f20eaecf12bf0ecf47109c0b32aa37be1704069eb54ad1793c11bf205ae5b803d8674d98d5875ffc12b5c748e22e5c3ab1509941192bf23db6945ccbd6d53c70bebaa8ffcadc0a352d81579511d13ba8323b09363037d1c9c36f45e7386a912f5a507cc0f4669d5eb49b5ab87c8248aadfaf1fd8e3d5662a3c816c9da36cd39a944bc357708a6a89e358e352dfad8a664bd97d9b9252c5f732692ffff1a14e92bc6c7ae70b10f2fe8bbd8f35aef3aff542d5e2385f24d41916dd125858aececd48aefc8bf577feaf75fe9f7bff03a8a0fd48890ca3f88990d476fff989a0beb4a99c96dbb838ba5a56eef79b488a1f2efc1d349b88634308de1186d9bbcefa02ba7f7aed25aa3fd1478386e0a572902d81c9a2bcf09af2b10e1be54d8166261665e848fdafaf947d910e430f4dcb5ed249173b1a417f87bf589fc62196e211a9779019bb21eee201e6af9fe6a828eb69136618419d38e5c9eff5d2e68914a85c16c6f2a0a1b588cb0a5c906944d30701cb3acd0bf77142a4226111e11919fecbc48bc5f71eaa26862516821b1d5887e309a6f428db9707ac490549ce54cb1341d16a04a1be879619f1e8ad2ac486196e66f647d21a2fe09842297bcb8a175d2f0876400225df5a5cc09bf8ea7f5da6920e7170d0ebfaaa27f8a28c2088dd09aa1a6366ba48c633ce70a9436ac1547f6b856f6912294ba7af40169c5313ef99cd7ff8b15590a6e50d54f2dc7fb69f276d23fa572d3ebd68dd807a3d6eee318cbc178bed9ff6e1011d5e715381c701e63a0693638259fad1988baf1bee2a535072854a76518e13fb03a1de9c51ef3cf2e506337b1a5a383470785214ce33403cc03e63055e6471f1f5a7692dd2d98494c2a049815e12399ce76bcd13e5ba05fb508856c6fef1e30dc2d0cc0170c3788bbe9ab0c487d12e4612264fe6a5b3f86ca93c93d2d0fef7f56251eb6a1b36b44b06c1dd95e5ac1b777b4ab654fa889b3b35a152ebaa1534bb018301dbf216623c314d33431dd3e27c16b05f0186743aebc70cfc31dbe172d586c62fad9ca54e60917bf5f59e1f62dd3fc8ca011b0601cc1d3f909d2c96e6a8023679e0a494975af060543ac4ceb1137660936bc8336ad251eab0f8be0075cb3907bf0e71f0b3a8b93dfa850d141e1a3d6dbdfdfdf6703da511d0af8e52a9f1b6b4646bd1f1b9b3dba4a5baedc1382d57991f'
}

/** Decrypts the firebasePrivateKey
 *
 * To be used primarily on Vercel to overcome environment variable
 * 4kb max total size constraint.  */
export function getFirebasePrivateKey(): string {
  const key = process.env.PRIVATE_FIREBASE_PRIVATE_KEY_ENC_KEY
  const iv = process.env.PRIVATE_FIREBASE_PRIVATE_KEY_ENC_IV

  if (key == null || iv == null) return ''

  if (
    process.env.DOPPLER_ENVIRONMENT === 'test' ||
    process.env.DOPPLER_ENVIRONMENT === 'dev' ||
    process.env.DOPPLER_ENVIRONMENT === 'stg' ||
    process.env.DOPPLER_ENVIRONMENT === 'prd'
  ) {
    const encrypted = FIREBASE_PRIVATE_KEY_ENC[process.env.DOPPLER_ENVIRONMENT]
    return decrypt([key, iv, encrypted])
  }

  return ''
}

export async function getFirebasePrivateKeyWeb(): Promise<string> {
  const key = process.env.PRIVATE_FIREBASE_PRIVATE_KEY_ENC_KEY
  const iv = process.env.PRIVATE_FIREBASE_PRIVATE_KEY_ENC_IV

  if (key == null || iv == null) return ''

  if (
    process.env.DOPPLER_ENVIRONMENT === 'test' ||
    process.env.DOPPLER_ENVIRONMENT === 'dev' ||
    process.env.DOPPLER_ENVIRONMENT === 'stg' ||
    process.env.DOPPLER_ENVIRONMENT === 'prd'
  ) {
    const encrypted = FIREBASE_PRIVATE_KEY_ENC[process.env.DOPPLER_ENVIRONMENT]
    return await webDecrypt([key, iv, encrypted])
  }

  return ''
}
