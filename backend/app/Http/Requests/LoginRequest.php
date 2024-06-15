<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use JetBrains\PhpStorm\ArrayShape;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    #[ArrayShape(['email' => "string", 'password' => "string"])] public function rules(): array
    {

        return [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ];
    }

    #[ArrayShape(['email.required' => "string", 'password.required' => "string"])] public function messages(): array
    {
        return [
            'email.required' => 'email is required',
            'password.required' => 'password is required',
        ];
    }

}
