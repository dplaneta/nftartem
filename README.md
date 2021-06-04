<pre>
  NFTArtem #1

  Title:        NFTArtem framework and serverless API
  Author:       Dawid Planeta <dawid.p@nftartem.com>
  Affiliation:  NFTArtem.com <https://nftartem.com>
  Created:      2021-05-31
</pre>


# Abstract

[NFTArtem](https://nftartem.com) defines the NFT legal framework and metadata standard. Creating an opportunity to digitalize/tokenize, custody and sell physical art certificate of ownership as NFT to collectors and investors via XRPL.

- **Our vision** is to create a bridge between analog and digital art markets with a standardized legal framework, bound with an NFT on XRP Ledger.
- **Our mission** is to helps artists, art brokers, and galleries digitalise and promote art via the blockchain, through NFT and XRPL technology.
- **Our PoC** is to provide:
  - `Open-source NFT legal framework.`
  - `Metadata template`, standardized together with artists, art dealers, and investors.
  - `Open-source serverless API.`
  - [global marketplace](https://nftartem.com) to provide liquidity via NFT and XRPL for the art industry.


# Motivation

NFT, especially if it represents ownership of a physical object, simplifies trading and provides liquidity between global regions like Europe and Asia. 
NFT open the door to trade any physical assets and could be used to provide outstanding liquidity. 
We want to help hedge funds, family offices, and institutional investors manage and trade physical art as a digital form of ownership certificate (NFT).


# Background

A new era of art is upon us, and those that fail to adapt will be left behind.
Non-Fungible Token is the registration of ownership of a digital object on a blockchain — it can be any type of media, including but not limited to art, videos, and music. The non-fungible part means the object is unique, making it irreplaceable.

The technology ensures traceability and transparency of provenance, making information about past sellers and prices publicly available, consequently reducing the possibility of fraud.

We will directly support museums, auction houses, and art dealers with open-source ready-to-use solutions.
We promote the NFTArtem legal framework, XRPL standard, and open-source serverless API across the industry, especially art and investment institutions.


# Standard

NFTArtem standard represents the certificate of ownership of the physical object and custody agreement (e.g., clearinghouse or museum) as a legal framework bind with NFT XRPL.

The legal framework and NFT metadata standard is built together with experts on both sides of the market and should be widely adopted by museums, clearinghouses, art dealers, artists, collectors, and investors - helping trade art more freely, providing liquidity to the market with buyers and sellers.

  - The NFT owner (trader or collector) can claim the physical object, and the digital representation (NFT) will be revoked.
  - NFT & legal standard supports shared ownership, partial ownership rights, and fractionalization incentives.

## NFT Legal Framework

```yml
title: DIGITAL CREATION LICENSE AGREEMENT
template: https://github.com/dplaneta/nftartem/legal
certificate: true

author:
  type: "Artist"
  name: "James Black"
  owner: true

object:
  type: "Art"
  title: "Episode 2019"
  physical: true
  details:
    artist:
      cid: ""
      name: "James Black"
    description: ""
    # Year of Work
    year: "2005-2007"
    medium: "Prints and multiples, Serigraph"
    edition: "120"
    size: "32 x 22 in. (81.3 x 55.9 cm.)"
    movement: "Contemporary Art"
    exhibitions: "03/04/2021–04/17/2021 Selected Prints"
    custody: "Clearing House XYZ"

abstract: >-
  This non-fungible token (NFT) is issued by {author.name} ({author.type})
  in connection with {object.title} (the "{object.type}") and constitutes a license
  grant subject to terms and conditions (this "Agreement") binding on the {author.type}
  {author.owner? and the owner of the NFT ("NFT Owner"): null}

license:
  commercial:
    type: "Non Commercial"
    description: >-
      Non Commercial means not primarily intended for or directed towards commercial
      advantage or monetary compensation.
  grant: >-
    Subject to the terms and conditions herein, {author.type} grants the NFT Owner
    a nonexclusive, worldwide, royalty-free, non-sublicensable license to reproduce
    the {object.type}, in whole or in part, only for {license.commercial.type}
    purpose or solely in connection with the sale of this NFT.

    {commercial.description}

    If the NFT is transferred by NFT Owner, the former owner retains no rights
    and all rights granted herein may be exercised by the new NFT owner, subject
    to the new owner's agreement to the terms and conditions herein.

    No rights in the Art art granted by this NFT to an NFT owner that does not agree
    to the terms and conditions herein, and any reproduction of the Art by such as
    non-agreeing owner may constitute copyright infringement subject to civil
    and criminal penalties under 17 U.S.C. 101 et seq. and analogous statues worldwide.

representation: >-
  TBD

custody:
  name: ""
  type: "custody license type"
  license: >-
    How the physical art is custody - TBD

disclaimer: >-
  THIS NON FUNGIBLE TOKEN ("NFT") SHOULD BE CONSIDERED A SECURITY AS DEFINED UNDER
  THE SECURITIES ACT OF 1933, AS AMENDED (THE "ACT"), OR UNDER THE SECURITIES LAWS OF ANY
  STATES IN THE UNITED STATES. THE AUCTION OF THIS NFT IS NOT AN OFFERING OF OR A SOLICITATION
  TO PURCHASE SECURITIES OR OTHERWISE MAKE AN INVESTMENT. THIS NFT IS NOT MEANT FOR INVESTMENT
  PURPOSES OR SPECULATION AND ANY PURCHASER OR FUTURE HOLDER OF THIS NFT SHOULD NOT EXPECT
  TO MAKE PROFIT IN CONNECTION WITH ITS POSSESSION OR RESALE OF THIS NFT. THIS NFT IS FOR
  CONSUMER ENJOYMENT AND USE AND CONSUMPTION ONLY.

signed:
  # Signed legal framework (for example by owner and art dealer).
  framework: "CudaSign"
  cid: ""
  sha256: ""
```


## NFT Metadata

  ```json
{
    "webHostingURI": "nft.xrpfs.com",
    "honorDynamicILPAddress": true,
    "staticILPAddress": "$ilp.uphold.com/abc",
    "author": {
        "wallet": "",
        "name": "",
        "email": "name [@] example [.] com",
        "payId": "example$example.com",
        "links": {
          "twitter": "@name",
          "website": "http://website.com/",
        },
        "bio": ""
    },
    "details": {
        "title": "title",
        "description": "description",
        "uri": "File path to this resource in Cloud Storage",
        "cover": "cover_file.jpg",
        "preview:": "preview_file.mp4",
        "legal": "legal_framework.yml",
        "ipfs": "ipfs address",
        "torrent": "torrent address",
        "object": {
            "year": "2005-2007",
            "medium": "Prints and multiples, Serigraph",
            "edition": "120",
            "size": "32 x 22 in. (81.3 x 55.9 cm.)",
            "movement": "Contemporary Art",
            "exhibitions": "03/04/2021–04/17/2021 Selected Prints",
            "custody": "Clearing House XYZ"
        },
        "NFTWalletAddress": "",
        "NFTWalletXAddress": ""
    },
    "hashes": [
        {
            "file": "/uri/cover_file.mp4",
            "cid": "QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L4",
            "sha256": "d9fc201d89fdf94ba708022fe8540b026d5427f799849c8656f26d2eb29aa698"
        },
        {
            "file": "/uri/preview_file.mp4",
            "cid": "QmNT6isqrhH6LZWg8NeXQYTD9wPjJo2BHHzyezpf9BdHbD",
            "sha256": "20b80994904d40acbf6224024097a2ce5a1ea7130478e57162a38af1b876dfce"
        },
        {
            "file": "/uri/legal_framework.yml",
            "cid": "D9wPjJo2BHg8NeXQYTD9wXJeNSY6NqmDQmRe6bYHv4XtsA",
            "sha256": "a9941afde156fc87aa058a85e57ef51475fe83169530a16403a9941a9941afde"
        },
        {
            "file": "/uri/certificate.pdf",
            "cid": "QmRe6bYHv4XtsA8oXJeNSY6NqmDYa9Q3JBhUtZCEAC6yDQ",
            "sha256": "7ef51475fe83169530a16403a9941afde156fc87aa058a8500131a23de600f9a"
        }
    ],
    "created": 1622677824000,
    "framework": "https://github.com/dplaneta/nftartem"
}
  ```

## NFT File Structure

```
uri/
  - cover.jpg
  - preview.mp4
  - legal.yml
  - meta.json
  - certificate.pdf
  ...
  - file1
  - file2
  ...
  - fileN
```

# Serverless NFT XRP Ledger API:

- [Google Function](/gcf)
- AWS Lambda
- Azure Functions
