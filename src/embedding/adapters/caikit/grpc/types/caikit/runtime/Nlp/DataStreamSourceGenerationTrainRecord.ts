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

// Original file: src/grpc/protos/caikit_runtime_Nlp.proto

import type {
  DataStreamSourceGenerationTrainRecordJsonData as _caikit_runtime_Nlp_DataStreamSourceGenerationTrainRecordJsonData,
  DataStreamSourceGenerationTrainRecordJsonData__Output as _caikit_runtime_Nlp_DataStreamSourceGenerationTrainRecordJsonData__Output
} from './DataStreamSourceGenerationTrainRecordJsonData';
import type {
  FileReference as _caikit_data_model_common_FileReference,
  FileReference__Output as _caikit_data_model_common_FileReference__Output
} from '../../../caikit_data_model/common/FileReference';
import type {
  ListOfFileReferences as _caikit_data_model_common_ListOfFileReferences,
  ListOfFileReferences__Output as _caikit_data_model_common_ListOfFileReferences__Output
} from '../../../caikit_data_model/common/ListOfFileReferences';
import type {
  Directory as _caikit_data_model_common_Directory,
  Directory__Output as _caikit_data_model_common_Directory__Output
} from '../../../caikit_data_model/common/Directory';
import type {
  S3Files as _caikit_data_model_common_S3Files,
  S3Files__Output as _caikit_data_model_common_S3Files__Output
} from '../../../caikit_data_model/common/S3Files';

export interface DataStreamSourceGenerationTrainRecord {
  jsondata?: _caikit_runtime_Nlp_DataStreamSourceGenerationTrainRecordJsonData | null;
  file?: _caikit_data_model_common_FileReference | null;
  list_of_files?: _caikit_data_model_common_ListOfFileReferences | null;
  directory?: _caikit_data_model_common_Directory | null;
  s3files?: _caikit_data_model_common_S3Files | null;
  data_stream?: 'jsondata' | 'file' | 'list_of_files' | 'directory' | 's3files';
}

export interface DataStreamSourceGenerationTrainRecord__Output {
  jsondata?: _caikit_runtime_Nlp_DataStreamSourceGenerationTrainRecordJsonData__Output | null;
  file?: _caikit_data_model_common_FileReference__Output | null;
  list_of_files?: _caikit_data_model_common_ListOfFileReferences__Output | null;
  directory?: _caikit_data_model_common_Directory__Output | null;
  s3files?: _caikit_data_model_common_S3Files__Output | null;
  data_stream: 'jsondata' | 'file' | 'list_of_files' | 'directory' | 's3files';
}
