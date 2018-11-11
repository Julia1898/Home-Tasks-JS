var data = {
    "name": "Me",
    "children": [
        {
          "name": "mum",
          "children":[
              {
                  "name": "grandmother",
                  "children":[
                      {
                          "name": "great-grandmother",
                          "children":[]
                      },
                      {
                          "name": "great-grandfather",
                          "children": []
                      }
                  ]
              },
              {
                  "name": "grandfather",
                  "children":[
                    {
                        "name": "great-grandmother",
                        "children":[]
                    },
                    {
                        "name": "great-grandfather",
                        "children": []
                    }
                ]
              }
          ]
        },
        {
          "name": "dad",
          "children":[
            {
                "name": "grandmother",
                "children":[
                    {
                        "name": "great-grandmother",
                        "children":[]
                    },
                    {
                        "name": "great-grandfather",
                        "children": []
                    }
                ]
            },
            {
                "name": "grandfather",
                "children":[
                  {
                      "name": "great-grandmother",
                      "children":[]
                  },
                  {
                      "name": "great-grandfather",
                      "children": []
                  }
                ]
            }
          ]
        }
    ]
};

export {data};