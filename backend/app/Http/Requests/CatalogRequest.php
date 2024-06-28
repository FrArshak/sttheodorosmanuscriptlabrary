<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use JetBrains\PhpStorm\ArrayShape;

class CatalogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    #[ArrayShape(['catalog_title' => "string", 'catalog_text' => "string", 'pdf_path' => "string", 'image' => "string"])]
    public function rules(): array
    {
        return [
            'catalog_title' => 'required',
            'catalog_text' => 'required',
            'pdf_path' => 'required',
            'image' => 'required',
        ];
    }


    #[ArrayShape(['catalog_title.required' => "string", 'catalog_text.required' => "string", 'pdf_path.required' => "string", 'image.required' => "string"])]
    public function messages(): array
    {
        return [
            'catalog_title.required' => 'Catalog title is required',
            'catalog_text.required' => 'Catalog text is required',
            'pdf_path.required' => 'Catalog pdf is required',
            'image.required' => 'Catalog image is required',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param Validator $validator
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->all();
        $firstError = $errors[0] ?? 'Validation failed';

        throw new HttpResponseException(response()->json([
            'success' => '0',
            'type' => 'error',
            'message' => $firstError
        ], 422));
    }
}
