/**
 * Copyright 2024 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { WikipediaTool } from 'bee-agent-framework/tools/search/wikipedia';
import { OpenMeteoTool } from 'bee-agent-framework/tools/weather/openMeteo';
import { ArXivTool } from 'bee-agent-framework/tools/arxiv';
import { PythonTool } from 'bee-agent-framework/tools/python/python';
import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { SystemTools } from '../dist/tools/entities/tool-calls/system-call.entity';
import { ToolType } from '../dist/tools/entities/tool/tool.entity';

import { createSearchTool } from '@/runs/execution/tools/search-tool';
import { BEE_CODE_INTERPRETER_URL } from '@/config';
import { createPythonStorage } from '@/runs/execution/tools/python-tool-storage';
import { FileSearchTool } from '@/runs/execution/tools/file-search-tool';
import { ReadFileTool } from '@/runs/execution/tools/read-file-tool';
import { Tool } from '@/tools/entities/tool/tool.entity';
import { SystemTool } from '@/tools/entities/tool/system-tool.entity';

export class ToolsSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const arXivTool = new ArXivTool();
    const searchTool = createSearchTool();
    const wikipediaTool = new WikipediaTool();
    const weatherTool = new OpenMeteoTool();
    const pythonTool = BEE_CODE_INTERPRETER_URL
      ? new PythonTool({
          codeInterpreter: { url: BEE_CODE_INTERPRETER_URL },
          storage: createPythonStorage([], null)
        })
      : null;
    const fileSearch = new FileSearchTool({ vectorStores: [], maxNumResults: 0 });
    const readFile = new ReadFileTool({ files: [], fileSize: 0 });

    const tools: Tool[] = [
      new SystemTool({
        type: ToolType.SYSTEM,
        id: SystemTools.WEB_SEARCH,
        name: searchTool.name,
        description: searchTool.description,
        inputSchema: (await searchTool.getInputJsonSchema()).toString(),
        userDescription:
          "Retrieve real-time search results from across the internet, including news, current events, or content from specific websites or domains. Leverages Google's indexing and search algorithms to provide relevant results, rather than functioning as a web scraper."
      }),
      new SystemTool({
        type: ToolType.SYSTEM,
        id: SystemTools.WIKIPEDIA,
        name: wikipediaTool.name,
        description: wikipediaTool.description,
        inputSchema: (await wikipediaTool.getInputJsonSchema()).toString(),
        userDescription:
          'Retrieve detailed information from [Wikipedia.org](https://wikipedia.org) on a wide range of topics, including famous individuals, locations, organizations, and historical events. Ideal for obtaining comprehensive overviews or specific details on well-documented subjects. May not be suitable for lesser-known or more recent topics. The information is subject to community edits which can be inaccurate.'
      }),
      new SystemTool({
        type: ToolType.SYSTEM,
        id: SystemTools.WEATHER,
        name: weatherTool.name,
        description: weatherTool.description,
        inputSchema: (await weatherTool.getInputJsonSchema()).toString(),
        userDescription:
          'Retrieve real-time weather forecasts including detailed information on temperature, wind speed, and precipitation. Access forecasts predicting weather up to 16 days in the future and archived forecasts for weather up to 30 days in the past. Ideal for obtaining up-to-date weather predictions and recent historical weather trends.'
      }),
      new SystemTool({
        type: ToolType.SYSTEM,
        id: SystemTools.ARXIV,
        name: arXivTool.name,
        description: arXivTool.description,
        inputSchema: (await arXivTool.getInputJsonSchema()).toString(),
        userDescription:
          'Retrieve abstracts of research articles published on [ArXiv.org](https://arxiv.org), along with their titles, authors, publication dates, and categories. Ideal for retrieving high-level information about academic papers. The full text of articles is not provided, making it unsuitable for full-text searches or advanced analytics.'
      }),
      new SystemTool({
        type: ToolType.SYSTEM,
        id: 'read_file',
        name: readFile.name,
        description: readFile.description,
        inputSchema: (await readFile.getInputJsonSchema()).toString(),
        userDescription:
          'Read and interpret basic files to deliver summaries, highlight key points, and facilitate file comprehension. Ideal for straightforward tasks requiring access to raw data without any processing. Text (.txt, .md, .html) and JSON files (application/json) are supported up to 5 MB. PDF (.pdf) and text-based image files (.jpg, .jpeg, .png, .tiff, .bmp, .gif) are supported by the WDU text extraction service, limited to the content window of our base model, Llama 3.1 70B, which is 5 MB. The WDU text extraction service is used to extract text from image and PDF files, while text file types are handled by the LLM directly.'
      }),
      new SystemTool({
        type: ToolType.FUNCTION,
        id: 'function',
        description:
          'Function to be executed by the user with parameters supplied by the assistant',
        name: 'Function',
        inputSchema: '{}'
      }),
      new SystemTool({
        type: ToolType.FILE_SEARCH,
        id: 'file_search',
        name: fileSearch.name,
        description: fileSearch.description,
        inputSchema: (await fileSearch.getInputJsonSchema()).toString(),
        userDescription:
          'Read and interpret larger or more complex files using advanced search techniques where contextual understanding is required. Content parsing and chunking is used to break down large volumes of data into manageable pieces for effective analysis. Embeddings (numerical representations that capture the meaning and context of content) enable both traditional keyword and vector search. Vector search enhances the ability to identify similar content based on meaning, even if the exact words differ, improving the chances of identifying relevant information. Text (.txt, .md, .html) and JSON files (application/json) are supported up to 100 MB. PDF (.pdf) and text-based image files (.jpg, .jpeg, .png, .tiff, .bmp, .gif) are supported by the WDU text extraction service.'
      })
    ];

    if (pythonTool) {
      tools.push(
        new SystemTool({
          type: ToolType.CODE_INTERPRETER,
          id: 'code_interpreter',
          name: pythonTool.name,
          description: pythonTool.description,
          inputSchema: (await pythonTool.getInputJsonSchema()).toString(),
          userDescription:
            'Execute Python code for various tasks, including data analysis, file processing, and visualizations. Supports the installation of any library such as NumPy, Pandas, SciPy, and Matplotlib. Users can create new files or convert existing files, which are then made available for download.'
        })
      );
    }

    em.persist(tools);
  }
}
